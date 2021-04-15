import { join } from 'path'
import {
  commonConfigExisted,
  configInPackageJSON,
  generateFromTemplateFile
} from '../../utils'
import { ConfigGenerator } from '../interface'

const CommitlintGenerator: ConfigGenerator = {
  key: 'commitlint',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc: 'Lint commit messages',
  refUrl: 'https://github.com/conventional-changelog/commitlint',
  devDependencies: ['@commitlint/cli', '@commitlint/config-conventional'],

  async checkExist(): Promise<boolean> {
    return (
      (await commonConfigExisted('commitlint')) ||
      configInPackageJSON(['commitlint'])
    )
  },

  async generateConfig(): Promise<boolean> {
    return (
      (await generateFromTemplateFile(join(__dirname, '.commitlintrc.js'))) &&
      (await generateFromTemplateFile(join(__dirname, 'commit-msg'), {
        folderPath: '.husky'
      }))
    )
  }
}

export default CommitlintGenerator
