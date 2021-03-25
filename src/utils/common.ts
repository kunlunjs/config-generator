// import { join } from 'path'
import glob = require('fast-glob')
import { readFileSync } from 'fs'
import { join } from 'path'

let pkg: Object | null = null

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
  return globExisted(`?(.)${name}?(rc)?({.js,.json,.y?(a)ml})`)
}

/**
 * 判断package.json中是否存在某些key，如果存在，那么可以认为对应的配置已存在
 * @param keys 配置项keys列表
 */
export async function configInPackageJSON(keys: string[]) {
  if (pkg === null) {
    try {
      pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), { encoding: 'utf-8'})) as Object
      return keys.some(key => pkg!.hasOwnProperty(key))
    } catch (error) {
      return false
    }
  }
}