import { join } from 'path'
import { AvailableConfigs } from '../../constants'
import {
  generateFromTemplateFile,
  commonConfigExisted,
  configInPackageJSON,
} from '../../utils'
import { ConfigGenerator } from '../interface'

const EslintGenerator: ConfigGenerator = {
  key: 'eslint',
  devDependencies: (selectedConfigKeys: AvailableConfigs[]) => {
    const deps = [
      'eslint',
      'eslint-plugin-import',
      'eslint-plugin-node',
      'eslint-plugin-promise',
    ]
    if (selectedConfigKeys.includes('prettier')) {
      deps.push(...['eslint-config-prettier', 'eslint-plugin-prettier'])
    }
    if (selectedConfigKeys.includes('typescript')) {
      deps.push(
        ...['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'],
      )
    }
    return deps
  },
  echoAfter:
    '你可能需要为 eslint 做个性化设置，必要时需要删除默认生成的配置，参考 https://eslint.org/docs/user-guide/configuring/',

  async checkExist(): Promise<boolean> {
    return (
      (await commonConfigExisted('eslint')) ||
      configInPackageJSON(['eslintConfig'])
    )
  },

  async generateConfig(
    selectedConfigKeys: AvailableConfigs[],
  ): Promise<boolean> {
    return (
      (await generateFromTemplateFile(join(__dirname, '.eslintignore'))) &&
      (await generateFromTemplateFile(join(__dirname, '.eslintrc.js.tpl'), {
        interpolationValues: {
          prettier: selectedConfigKeys.includes('prettier'),
          typescript: selectedConfigKeys.includes('typescript'),
        },
      }))
    )
  },
}

export default EslintGenerator