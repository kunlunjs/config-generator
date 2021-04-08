import { join } from 'path'
import { generateFromTemplateFile, commonConfigExisted } from '../../utils'
import { ConfigGenerator } from '../interface'

const Y2sGenerator: ConfigGenerator = {
  key: 'y2s',
  file: '.y2src.js',
  devDependencies: ['y2s'],

  checkExist(): Promise<boolean> {
    return commonConfigExisted(this.file!)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file!))
  }
}

export default Y2sGenerator
