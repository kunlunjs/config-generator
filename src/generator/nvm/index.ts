import { join } from 'path'
import { globExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const NvmGenerator: ConfigGenerator = {
  key: 'nvm',
  desc: 'A version manager for node.js',
  refUrl: 'https://github.com/nvm-sh/nvm#nvmrc',
  file: '.nvmrc',
  checkExist(): Promise<boolean> {
    return globExisted(this.file!)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file!))
  }
}

export default NvmGenerator
