import prompts = require('prompts')
import { availableConfigs } from './constants'
import runGenerator from './generator'
import { log, sleep } from './utils'

export async function run() {
  log(
    'info',
    '本工具仅用于生成项目的初始化配置使用，具体每个项目的一些配置仍然需要单独设置，建议在新增 package.json 后执行。'
  )
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
            description: availableConfigs[_module].desc,
            value: _module,
            selected: availableConfigs[_module].default
          }
        })
      }
    ])
    if (selected.length) {
      runGenerator(selected)
    } else {
      log('Done', 'Nothing to generate.', { error: true })
    }
  } catch (error) {
    log('Failed', '用户已取消选择', { error: true })
  }
}
