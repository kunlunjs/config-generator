import { join } from 'path'
import { globExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const GitGenerator: ConfigGenerator = {
  key: 'git',
  file: '.gitignore',
  checkExist(): Promise<boolean> {
    return globExisted(this.file!)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, '.gitignore.tpl'))
  }
}

export default GitGenerator
