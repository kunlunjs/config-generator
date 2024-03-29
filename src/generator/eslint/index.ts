import { join } from 'path'
import {
  generateFromTemplateFile,
  commonConfigExisted,
  configInPackageJSON
} from '../../utils'
import { AvailableConfigKeys } from '../generators'
import { ConfigGenerator } from '../interface'

const EslintGenerator: ConfigGenerator = {
  key: 'eslint',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc: 'Find and fix problems in your JS/TS code',
  refUrl: [
    {
      label: 'Reference',
      url: 'https://eslint.org/docs/user-guide/configuring/'
    }
  ],
  devDependencies: (selectedConfigKeys: AvailableConfigKeys[]) => {
    const deps = [
      'eslint',
      'eslint-plugin-import',
      'eslint-plugin-simple-import-sort',
      'eslint-plugin-n',
      'eslint-plugin-promise',
      'eslint-plugin-unused-imports'
    ]
    if (selectedConfigKeys.includes('jest')) {
      deps.push(...['eslint-plugin-jest'])
    }
    if (selectedConfigKeys.includes('prettier')) {
      deps.push(...['eslint-config-prettier', 'eslint-plugin-prettier'])
    }
    if (selectedConfigKeys.includes('typescript')) {
      deps.push(
        ...['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']
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
    selectedConfigKeys: AvailableConfigKeys[]
  ): Promise<boolean> {
    return (
      (await generateFromTemplateFile(join(__dirname, '.eslintignore'))) &&
      (await generateFromTemplateFile(join(__dirname, '.eslintrc.js.tpl'), {
        interpolationValues: {
          prettier: selectedConfigKeys.includes('prettier'),
          typescript: selectedConfigKeys.includes('typescript'),
          jest: selectedConfigKeys.includes('jest')
        }
      }))
    )
  }
}

export default EslintGenerator
