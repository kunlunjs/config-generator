import { execSync } from 'child_process'
import prompts = require('prompts')
import { log } from './utils'
import { TemplateKyes } from './generator/interface'
import selfPkgInfo from '../package.json'
import { showSpinner, isVersionUpdated } from './utils'

export async function upgradeValid(skipPrompts = false) {
  const stopSpinner = showSpinner('检测新版本中')
  // 获取最新版本
  const latestVersion = execSync(`npm show ${selfPkgInfo.name} version`, {
    encoding: 'utf-8'
  }).trim()
  stopSpinner()
  if (isVersionUpdated(selfPkgInfo.version.trim(), latestVersion)) {
    log('upgrade', `检测到新版本 ${latestVersion}，请更新本工具`)
    if (!skipPrompts) {
      const { next } = await prompts({
        name: 'next',
        type: 'confirm',
        message: '是否仍然使用（不推荐）？'
      })
      return !next
    }
    return true
  }
  return false
}

export const helpMessage =
  '本工具仅用于生成项目的初始化配置使用，具体每个项目的一些配置仍然需要单独设置。'

/**
 * 命令行参数预解析
 * @param args 命令行参数列表
 */
export default async function prepareForArgs(
  args: string[]
): Promise<
  | boolean
  | {
      template: TemplateKyes
    }
> {
  if (args.length) {
    // help信息
    if (['-h', '--help'].includes(args[0])) {
      log(
        'help',
        `${helpMessage}
用法：${selfPkgInfo.name} [flags]
flags的值如下：
-h, --help\t打印帮助信息
-v, --version\t打印当前版本
-t, --template\t选择模板，可选值 default: 默认, front: 前端模板, node: NodeJs后端模板, full: 全栈模板`
      )
      return false
    }
    // 版本信息
    if (['-v', '--version'].includes(args[0])) {
      log('version', selfPkgInfo.version)
      await upgradeValid()
      return false
    }
    // 模板
    if (['-t', '--template'].includes(args[0])) {
      if (['default', 'front', 'node', 'full'].includes(args[1])) {
        return {
          template: args[1] as TemplateKyes
        }
      }
      log('Template Error', '不支持的模板，使用默认模板')
      return {
        template: 'default'
      }
    }
  }
  return true
}
