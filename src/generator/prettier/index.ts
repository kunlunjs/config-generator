import { join } from 'path'
import {
  commonConfigExisted,
  configInPackageJSON,
  generateFromTemplateFile,
  globExisted
} from '../../utils'
import { ConfigGenerator } from '../interface'

const PrettierGenerator: ConfigGenerator = {
  key: 'prettier',
  devDependencies: ['prettier'],
  async checkExist(): Promise<boolean> {
    return (
      (await commonConfigExisted('prettier')) ||
      (await globExisted('.prettierrc.json5')) ||
      (await globExisted('.prettierrc.toml')) ||
      configInPackageJSON(['prettier'])
    )
  },

  async generateConfig(): Promise<boolean> {
    return (
      (await generateFromTemplateFile(join(__dirname, '.prettierrc.js'))) &&
      (await generateFromTemplateFile(join(__dirname, '.prettierignore')))
    )
  }
}

export default PrettierGenerator
