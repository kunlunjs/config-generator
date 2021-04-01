import { join } from 'path'
import {
  configInPackageJSON,
  generateFromTemplateFile,
  globExisted,
} from '../../utils'
import { ConfigGenerator } from '../interface'

const BrowserslistGenerator: ConfigGenerator = {
  key: 'browserslist',
  file: '.browserslistrc',
  async checkExist(): Promise<boolean> {
    return (
      (await globExisted(this.file!)) || configInPackageJSON(['browserslist'])
    )
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file!))
  },
}

export default BrowserslistGenerator
