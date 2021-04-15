import { join } from 'path'
import { globExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const NpmGenerator: ConfigGenerator = {
  key: 'npm',
  desc: "Npm's configuration",
  refUrl: 'https://docs.npmjs.com/cli/v7/configuring-npm/npmrc/',
  file: '.npmrc',
  checkExist(): Promise<boolean> {
    return globExisted(this.file!)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, '.npmrc.tpl'))
  }
}

export default NpmGenerator
