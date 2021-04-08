// import { join } from 'path'
import { copyFile, writeFile, readFileSync } from 'fs'
import { ensureDir } from 'fs-extra'
import { join, parse } from 'path'
import { promisify } from 'util'
import { renderFile } from 'ejs'
import { sortPackageJson } from 'sort-package-json'
import glob = require('fast-glob')

import { ColorEnum, colorful } from './color'

interface PackageJson {
  [key: string]: any
}

let pkg: PackageJson | null = null

interface ArgOption {
  [key: string]: unknown
}
/**
 * 合并传入的配置和默认配置
 * @param defaultOpt 默认配置
 * @param opt 传入配置
 * @returns 综合后的配置
 */
export function loadOption<T extends ArgOption>(defaultOpt: T, opt?: T): T {
  return { ...defaultOpt, ...(opt || {}) }
}

/**
 * 对应的glob是否有匹配的文件
 * @param globString glob字符串
 * @returns 对应的glob是否有匹配的文件
 */
export async function globExisted(globString: string) {
  const files = await glob(globString, { dot: true, cwd: process.cwd() })
  return files.length > 0
}

/**
 * 通用的配置文件是否存在的判断
 * 查找?(.)${name}?(rc)?({.js,.json,.y?(a)ml})
 * @param name 配置名称
 * @returns 是否有配置文件存在
 */
export async function commonConfigExisted(name: string) {
  return globExisted(
    `?(.)${name}?(rc)?(.config)?({.js,.ts,.cjs,.json,.y?(a)ml})`
  )
}

/**
 * 获取package.json配置
 */
export function getPkgInfo() {
  if (!pkg) {
    try {
      pkg = JSON.parse(
        readFileSync(join(process.cwd(), 'package.json'), {
          encoding: 'utf-8'
        })
      ) as PackageJson
    } catch (error) {
      log(
        'package',
        `读取 package.json 文件失败，请检查该文件是否存在且格式正确。`
      )
      //
    }
  }
  return pkg
}

/**
 * 更新package.json中的字段数据
 * @param _module 模块名称，如stylelint
 * @param keys 要更新的字段路径数组
 * @param value 要更新的值
 */
export async function updatePkg(
  _module: string,
  keys: string[],
  value: unknown
) {
  let obj = getPkgInfo()
  if (obj) {
    for (const [index, key] of keys.entries()) {
      if (index === keys.length - 1) {
        obj![key] = value
      } else {
        if (!(key in obj!)) {
          obj![key] = {}
        }
        obj = obj![key] as PackageJson
      }
    }
    const targetJSON = sortPackageJson(pkg!)
    await promisify(writeFile)(
      join(process.cwd(), 'package.json'),
      JSON.stringify(targetJSON, null, 2)
    )
    return true
  } else {
    log(
      _module,
      `更新 package.json 内容失败，你可以手动修改"${keys.join(
        '.'
      )}"的值为"${value}"。`
    )
  }
  return false
}

/**
 * 判断package.json中是否存在某些key，如果存在，那么可以认为对应的配置已存在
 * @param keys 配置项keys列表
 */
export function configInPackageJSON(keys: string[]) {
  getPkgInfo()
  if (pkg) {
    return keys.some(key => key in pkg!)
  }
  return false
}

export interface GenerateOption extends ArgOption {
  folderPath?: string
  interpolationValues?: Record<string, string | number | boolean>
}
/**
 * 从模板文件生成配置文件
 * @param templateFilePath 模板文件路径
 * @returns 是否成功
 */
export async function generateFromTemplateFile(
  templateFilePath: string,
  opt?: GenerateOption
): Promise<boolean> {
  const { folderPath, interpolationValues } = loadOption<GenerateOption>(
    {},
    opt
  )
  try {
    if (folderPath) {
      await ensureDir(join(process.cwd(), folderPath))
    }
    const targetFilePath = join(
      process.cwd(),
      folderPath ?? '',
      parse(templateFilePath).base
    ).replace(/\.tpl$/, '')
    if (!interpolationValues) {
      await promisify(copyFile)(templateFilePath, targetFilePath)
    } else {
      try {
        const rendered = await renderFile(templateFilePath, interpolationValues)
        await promisify(writeFile)(targetFilePath, rendered, {
          encoding: 'utf-8'
        })
      } catch (error) {
        log('render', error.toString?.() ?? error, { error: true })
      }
    }
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export interface LogOption extends ArgOption {
  error?: boolean
  nameColor?: ColorEnum
}
/**
 * 打印日志
 * @param name 模块名称
 * @param content 打印内容
 * @param opt 参数
 */
export function log(name: string, content: string, opt?: LogOption) {
  const option: LogOption = loadOption<LogOption>(
    { error: false, nameColor: 'FgCyan' },
    opt
  )
  console.log(
    `${colorful(
      `[${name[0].toUpperCase()}${name.slice(1)}]:`,
      option.error ? 'FgRed' : option.nameColor!
    )} ${content}`
  )
}

/**
 * 等待一段时间
 * @param millisecond 毫秒
 */
export function sleep(millisecond: number) {
  return new Promise<void>(resolve => setTimeout(() => resolve(), millisecond))
}
