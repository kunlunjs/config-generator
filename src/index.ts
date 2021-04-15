import { execSync } from 'child_process'
import prompts = require('prompts')
import { sync } from 'fast-glob'
import { join } from 'path'
import runGenerator from './generator'
import { AvailableConfigKeys, availableConfigs } from './generator/generators'
import { log, sleep } from './utils'
import prepareForArgs, { helpMessage, upgradeValid } from './args'
import { TemplateKyes } from './generator/interface'

export async function run(args: string[]) {
  const prepare = await prepareForArgs(args)
  if (!prepare) return
  log('Help', helpMessage)
  if (await upgradeValid()) {
    return
  }
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
      // 确认初始化git
      const cwd = process.cwd()
      if (!sync(join(cwd, '.git')).length) {
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
