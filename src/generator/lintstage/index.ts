import { join } from 'path'
import {
  generateFromTemplateFile,
  commonConfigExisted,
  configInPackageJSON
} from '../../utils'
import { ConfigGenerator } from '../interface'

const LintStagedGenerator: ConfigGenerator = {
  key: 'lintstaged',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc:
    "Run linters against staged git files and don't let 💩 slip into your code base!",
  refUrl: 'https://www.npmjs.com/package/lint-staged',
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
