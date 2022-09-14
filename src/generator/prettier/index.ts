import { join } from 'path'
import {
  commonConfigExisted,
  configInPackageJSON,
  generateFromTemplateFile,
  globExisted,
  updatePkg
} from '../../utils'
import { ConfigGenerator } from '../interface'

const PrettierGenerator: ConfigGenerator = {
  key: 'prettier',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc: 'An opinionated code formatter',
  refUrl: 'https://prettier.io/docs/en/configuration.html',
  devDependencies: ['prettier', '@doremijs/prettier-config'],
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
      (await updatePkg(this.key, ['prettier'], '@doremijs/prettier-config')) &&
      (await generateFromTemplateFile(join(__dirname, '.prettierignore')))
    )
  }
}

export default PrettierGenerator
