import { join } from 'path'
import { generateFromTemplateFile, commonConfigExisted } from '../../utils'
import { ConfigGenerator } from '../interface'

const TypescriptGenerator: ConfigGenerator = {
  key: 'typescript',
  devDependencies: ['typescript'],

  checkExist(): Promise<boolean> {
    return commonConfigExisted('tsconfig.json')
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, 'tsconfig.json.tpl'))
  },
}

export default TypescriptGenerator
