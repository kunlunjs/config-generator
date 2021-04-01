import { join } from 'path'
import {
  commonConfigExisted,
  configInPackageJSON,
  generateFromTemplateFile,
  globExisted,
} from '../../utils'
import { ConfigGenerator } from '../interface'

const BabelGenerator: ConfigGenerator = {
  key: 'babel',
  dependencies: ['@babel/runtime'],
  devDependencies: ['@babel/core'],
  echoAfter:
    '你仍需要为 babel 设置 preset 等设置，参考 https://babeljs.io/docs/en/presets/',

  async checkExist(): Promise<boolean> {
    return (
      (await commonConfigExisted(BabelGenerator.key)) ||
      (await globExisted('babel.config.json')) ||
      configInPackageJSON(['babel'])
    )
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, '.babelrc.js'))
  },
}

export default BabelGenerator
