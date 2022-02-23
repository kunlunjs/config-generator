import { join } from 'path'
import { generateFromTemplateFile, commonConfigExisted } from '../../utils'
import { ConfigGenerator } from '../interface'

const A2sGenerator: ConfigGenerator = {
  key: 'a2s',
  desc: 'OpenAPI/Swagger/YAPI to service code generator',
  refUrl: 'https://www.npmjs.com/package/@zidong/a2s',
  file: '.a2s.js',
  devDependencies: ['@zidong/a2s'],

  checkExist(): Promise<boolean> {
    return commonConfigExisted(this.file!)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file!))
  }
}

export default A2sGenerator
