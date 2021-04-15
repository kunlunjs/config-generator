import { join } from 'path'
import {
  configInPackageJSON,
  generateFromTemplateFile,
  globExisted
} from '../../utils'
import { ConfigGenerator } from '../interface'

const BrowserslistGenerator: ConfigGenerator = {
  key: 'browserslist',
  select: {
    front: true,
    full: true
  },
  desc:
    'The config to share target browsers and Node.js versions between different front-end tools',
  refUrl: 'https://github.com/browserslist/browserslist',
  file: '.browserslistrc',
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
