import { join } from 'path'
import { globExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const EditorconfigGenerator: ConfigGenerator = {
  key: 'editorconfig',
  file: '.editorconfig',
  checkExist(): Promise<boolean> {
    return globExisted(this.file!)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, this.file!))
  },
}

export default EditorconfigGenerator
