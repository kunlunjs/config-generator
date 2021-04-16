import { join } from 'path'
import {
  commonConfigExisted,
  configInPackageJSON,
  generateFromTemplateFile,
  globExisted
} from '../../utils'
import { AvailableConfigKeys } from '../generators'
import { ConfigGenerator } from '../interface'

const BabelGenerator: ConfigGenerator = {
  key: 'babel',
  select: {
    front: true,
    full: true,
    node: true
  },
  desc: 'Use next generation JavaScript, today',
  refUrl: 'https://babeljs.io/docs/en/configuration',
  dependencies: [
    // 提供模块化函数库
    '@babel/runtime',
    'core-js@3'
  ],
  devDependencies: (selectedKeys: AvailableConfigKeys[]) => {
    const ret = [
      '@babel/core',
      '@babel/preset-env',
      // 相同的函数抽离出来，同时避免全局变量污染
      '@babel/plugin-transform-runtime'
    ]
    if (selectedKeys.includes('typescript')) {
      ret.push('@babel/preset-typescript')
    }
    return ret
  },
  async checkExist(): Promise<boolean> {
    return (
      (await commonConfigExisted(BabelGenerator.key)) ||
      (await globExisted('babel.config.json')) ||
      configInPackageJSON(['babel'])
    )
  },

  async generateConfig(
    selectedConfigKeys: AvailableConfigKeys[]
  ): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, '.babelrc.js.tpl'), {
      interpolationValues: {
        typescript: selectedConfigKeys.includes('typescript')
      }
    })
  }
}

export default BabelGenerator
