import { join } from 'path'
import {
  generateFromTemplateFile,
  commonConfigExisted,
  configInPackageJSON,
  updatePkg
} from '../../utils'
import { ConfigGenerator } from '../interface'

const StylelintGenerator: ConfigGenerator = {
  key: 'stylelint',
  file: '.stylelintrc.js',
  devDependencies: ['stylelint', 'stylelint-config-standard'],

  async checkExist(): Promise<boolean> {
    return (
      (await commonConfigExisted('stylelint')) ||
      configInPackageJSON(['stylelint'])
    )
  },

  async generateConfig(): Promise<boolean> {
    return (
      (await generateFromTemplateFile(join(__dirname, this.file!))) &&
      (await updatePkg(
        this.key,
        ['scripts', 'stylint'],
        'stylelint "src/**/*.{css,less,scss,sass,styl}" --fix'
      ))
    )
  }
}

export default StylelintGenerator
