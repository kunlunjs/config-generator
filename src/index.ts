import { execSync } from 'child_process'
import prompts = require('prompts')
import { sync } from 'fast-glob'
import { join } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import runGenerator from './generator'
import { AvailableConfigKeys, availableConfigs } from './generator/generators'
import { log, sleep } from './utils'
import prepareForArgs, { helpMessage, upgradeValid } from './args'
import { TemplateKyes } from './generator/interface'

export async function run(args: string[]) {
  // 命令行参数解析
  const prepare = await prepareForArgs(args)
  if (!prepare) return
  log('Help', helpMessage)
  if (await upgradeValid()) {
    return
  }
  // 弹框选择
  await sleep(1000)
  try {
    const { selected } = await prompts([
      {
        type: 'multiselect',
        name: 'selected',
        message: '请选择需要添加的配置集合',
        choices: Object.keys(availableConfigs).map(_module => {
          return {
            title: _module,
            description: availableConfigs[_module as AvailableConfigKeys].desc,
            value: _module,
            selected:
              availableConfigs[_module as AvailableConfigKeys].select?.[
                (prepare as { template: TemplateKyes }).template ?? 'default'
              ]
          }
        })
      }
    ])
    if (selected.length) {
      const cwd = process.cwd()
      const pkgFile = join(cwd, 'package.json')
      // 确保package.json存在
      if (!sync(pkgFile).length) {
        log('Package.json', '检测到 package.json 文件不存在，已为您自动创建')
        execSync('npm init -y')
      }
      // 添加最低 node 版本要求
      const pkg = JSON.parse(readFileSync(pkgFile, 'utf-8'))
      pkg.engines = pkg.engines || {}
      pkg.engines.node = '>=10.0.0'
      writeFileSync(pkgFile, JSON.stringify(pkg, null, 2))
      // 确认初始化 git
      if (!sync(join(cwd, '.git')).length) {
        log('git', '已为您自动初始化 git 仓库')
        execSync('git init', { cwd })
      }
      runGenerator(selected)
    } else {
      log('Done', 'Nothing to generate.', { error: true })
    }
  } catch (error) {
    log('Failed', '用户已取消选择', { error: true })
  }
}
