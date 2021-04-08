import { join } from 'path'
import { globExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const DockerGenerator: ConfigGenerator = {
  key: 'docker',
  file: '.dockerignore',
  checkExist(): Promise<boolean> {
    return globExisted(this.file!)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, '.dockerignore.tpl'))
  }
}

export default DockerGenerator
