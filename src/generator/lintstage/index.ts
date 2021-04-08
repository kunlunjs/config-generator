import { join } from 'path'
import {
  generateFromTemplateFile,
  commonConfigExisted,
  configInPackageJSON
} from '../../utils'
import { ConfigGenerator } from '../interface'

const LintStagedGenerator: ConfigGenerator = {
  key: 'lintstaged',
  devDependencies: ['lint-staged'],

  async checkExist(): Promise<boolean> {
    return (
      (await commonConfigExisted(this.key)) ||
      configInPackageJSON(['lint-staged'])
    )
  },

  async generateConfig(): Promise<boolean> {
    return (
      (await generateFromTemplateFile(join(__dirname, '.lintstagedrc.js'))) &&
      (await generateFromTemplateFile(join(__dirname, 'pre-commit'), {
        folderPath: '.husky'
      }))
    )
  }
}

export default LintStagedGenerator
