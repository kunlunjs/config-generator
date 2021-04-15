import { colorful, log, runCommand } from '../utils'

import { getPackageManager } from '../utils'
import { availableConfigs, AvailableConfigKeys } from './generators'

export default async function run(selectedConfigKeys: AvailableConfigKeys[]) {
  let generated = 0
  const dependencies: string[] = []
  const devDependencies: string[] = []
  const echoList: [string, string][] = []
  const execList: [string, string][] = []
  const refUrls: { label: string; url: string }[] = []
  for (const key of selectedConfigKeys) {
    const generator = availableConfigs[key]
    if (!(await generator.checkExist())) {
      generated++
      log(key, 'Generating...')
      if (await generator.generateConfig(selectedConfigKeys)) {
        if (generator.execAfter) {
          execList.push([key, generator.execAfter])
        }
        if (generator.echoAfter) {
          echoList.push([key, generator.echoAfter])
        }
      } else {
        log(key, 'Failed.', { error: true })
      }
      // 统计依赖
      if (generator.dependencies) {
        dependencies.push(
          ...(generator.dependencies instanceof Function
            ? generator.dependencies(selectedConfigKeys)
            : generator.dependencies)
        )
      }
      if (generator.devDependencies) {
        devDependencies.push(
          ...(generator.devDependencies instanceof Function
            ? generator.devDependencies(selectedConfigKeys)
            : generator.devDependencies)
        )
      }
    } else {
      log(key, 'Existed.')
    }
    if (generator.refUrl) {
      if (typeof generator.refUrl === 'string') {
        refUrls.push({
          label: generator.key,
          url: generator.refUrl
        })
      } else {
        refUrls.push(
          ...generator.refUrl.map(ref => {
            return {
              label: `${generator.key}: ${ref.label}`,
              url: ref.url
            }
          })
        )
      }
    }
  }
  // 打印配置参考url表格
  console.log('\n')
  log('references', '如果需要修改默认生成的配置，请参考下面表格中的地址')
  console.table(refUrls)
  // 安装依赖
  if (dependencies.length || devDependencies.length) {
    const packageManager = await getPackageManager()
    const commands = []
    if (dependencies.length) {
      commands.push(`${packageManager || 'npm'} i ${dependencies.join(' ')}`)
    }
    if (devDependencies.length) {
      commands.push(
        `${packageManager || 'npm'} ${
          packageManager === 'yarn' ? 'add' : 'i'
        } -D ${devDependencies.join(' ')}`
      )
    }
    const _commands = commands.join('\n')
    if (!packageManager) {
      log(
        `install`,
        `建议使用 pnpm 或 yarn 进行包管理，不建议使用 npm 进行包管理，如需安装请执行 npm i -g pnpm/yarn，并在安装后执行\n${_commands.replace(
          /^npm/g,
          'pnpm/yarn'
        )}。如果一定要使用 npm 安装依赖，请执行:\n${_commands}`
      )
    } else {
      try {
        log('install', _commands)
        await runCommand(_commands)
      } catch (error) {
        log('install', '包安装失败', { error: true })
      }
    }
  }
  // exec after dependencies ensured.
  for (const [_module, command] of execList) {
    log(_module, command)
    await runCommand(command)
  }
  // echo after
  for (const [_module, msg] of echoList) {
    log(_module, colorful(msg, 'FgGreen'))
  }
  return log(
    'Done',
    generated > 0
      ? `Generated ${generated} module file${generated > 1 ? 's' : ''}.`
      : 'Nothing to generate.',
    { nameColor: 'FgGreen' }
  )
}
