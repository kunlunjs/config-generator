import { join } from 'path'
import { globExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const NpmGenerator: ConfigGenerator = {
  key: 'npm',
  file: '.npmrc',
  checkExist(): Promise<boolean> {
    return globExisted(this.file!)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, '.npmrc.tpl'))
  }
}

export default NpmGenerator
