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
  select: {
    front: true,
    full: true
  },
  desc:
    'A mighty, modern linter that helps you avoid errors and enforce conventions in your styles',
  refUrl: 'https://stylelint.io/user-guide/configure',
  file: '.stylelintrc.js',
  devDependencies: [
    'stylelint',
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties'
  ],

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
