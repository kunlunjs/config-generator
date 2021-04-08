import { join } from 'path'
import {
  configInPackageJSON,
  generateFromTemplateFile,
  globExisted
} from '../../utils'
import { ConfigGenerator } from '../interface'

const BrowserslistGenerator: ConfigGenerator = {
  key: 'browserslist',
  file: '.browserslistrc',
  echoAfter: `如果需要修改修改 browserslist 的配置，请参考 https://github.com/browserslist/browserslist`,
  async checkExist(): Promise<boolean> {
    return (
      (await globExisted(this.file!)) || configInPackageJSON(['browserslist'])
    )
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file!))
  }
}

export default BrowserslistGenerator
