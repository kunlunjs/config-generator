import { execSync } from 'child_process'
import prompts = require('prompts')
import { AvailableConfigKeys, availableConfigs } from './constants'
import runGenerator from './generator'
import { getPkgInfo, log, sleep } from './utils'

export async function run() {
  const pkg = getPkgInfo()
  if (pkg) {
    log('version', pkg.version)
    // 获取最新版本
    const latestVersion = execSync(`npm show ${pkg.name} version`)
    if (latestVersion > pkg.version) {
      log('upgrade', `检测到新版本 ${latestVersion}，请更新本工具`)
      const { next } = await prompts({
        name: 'next',
        type: 'confirm',
        message: '是否仍然使用（不推荐）？'
      })
      if (!next) {
        return
      }
    }
  }
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
            description: availableConfigs[_module as AvailableConfigKeys].desc,
            value: _module,
            selected: availableConfigs[_module as AvailableConfigKeys].default
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
