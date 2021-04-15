import { join } from 'path'
import { commonConfigExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const JestGenerator: ConfigGenerator = {
  key: 'jest',
  desc: 'A delightful JavaScript Testing Framework with a focus on simplicity',
  refUrl: 'https://jestjs.io/docs/configuration',
  devDependencies: ['jest'],
  checkExist(): Promise<boolean> {
    return commonConfigExisted('jest')
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, 'jest.config.ts.tpl'))
  }
}

export default JestGenerator
