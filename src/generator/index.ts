import { ConfigGenerator } from './interface'
import { colorful, log, runCommand } from '../utils'

import BabelGenerator from './babel'
import BrowserslistGenerator from './browserslist'
import CommitlintGenerator from './commitlint'
import DevmojiGenerator from './devmoji'
import DockerGenerator from './docker'
import EditorconfigGenerator from './editorconfig'
import EslintGenerator from './eslint'
import GitGenerator from './git'
import HuskyGenerator from './husky'
import JestGenerator from './jest'
import LicenseGenerator from './license'
import LintStagedGenerator from './lintstage'
import NpmGenerator from './npm'
import NvmGenerator from './nvm'
import PrettierGenerator from './prettier'
import ReadmeGenerator from './readme'
import StylelintGenerator from './stylelint'
import TypescriptGenerator from './typescript'
import Y2sGenerator from './y2s'
import { getPackageManager } from '../utils/package-manager'

const generatorMap: Record<string, ConfigGenerator> = {}

generatorMap[BabelGenerator.key] = BabelGenerator
generatorMap[BrowserslistGenerator.key] = BrowserslistGenerator
generatorMap[CommitlintGenerator.key] = CommitlintGenerator
generatorMap[DevmojiGenerator.key] = DevmojiGenerator
generatorMap[DockerGenerator.key] = DockerGenerator
generatorMap[EditorconfigGenerator.key] = EditorconfigGenerator
generatorMap[EslintGenerator.key] = EslintGenerator
generatorMap[GitGenerator.key] = GitGenerator
generatorMap[HuskyGenerator.key] = HuskyGenerator
generatorMap[JestGenerator.key] = JestGenerator
generatorMap[LicenseGenerator.key] = LicenseGenerator
generatorMap[LintStagedGenerator.key] = LintStagedGenerator
generatorMap[NpmGenerator.key] = NpmGenerator
generatorMap[NvmGenerator.key] = NvmGenerator
generatorMap[PrettierGenerator.key] = PrettierGenerator
generatorMap[ReadmeGenerator.key] = ReadmeGenerator
generatorMap[StylelintGenerator.key] = StylelintGenerator
generatorMap[TypescriptGenerator.key] = TypescriptGenerator
generatorMap[Y2sGenerator.key] = Y2sGenerator

export default async function run(selectedConfigKeys: string[]) {
  let generated = 0
  const dependencies: string[] = []
  const devDependencies: string[] = []
  const echoList: [string, string][] = []
  const execList: [string, string][] = []
  for (const key of selectedConfigKeys) {
    const generator = generatorMap[key]
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
  }
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
