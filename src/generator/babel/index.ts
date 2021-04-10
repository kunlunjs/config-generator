import { join } from 'path'
import { AvailableConfigKeys } from '../../constants'
import {
  commonConfigExisted,
  configInPackageJSON,
  generateFromTemplateFile,
  globExisted
} from '../../utils'
import { ConfigGenerator } from '../interface'

const BabelGenerator: ConfigGenerator = {
  key: 'babel',
  dependencies: [
    // 提供模块化函数库
    '@babel/runtime',
    'core-js@3'
  ],
  devDependencies: (selectedKeys: AvailableConfigKeys[]) => {
    const ret = [
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

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, '.babelrc.js'))
  }
}

export default BabelGenerator
