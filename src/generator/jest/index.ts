import { join } from 'path'
import { commonConfigExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const JestGenerator: ConfigGenerator = {
  key: 'jest',
  devDependencies: ['jest'],
  echoAfter: '你可以参考 https://jestjs.io/docs/configuration 补充 jest 配置。',
  checkExist(): Promise<boolean> {
    return commonConfigExisted('jest')
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, 'jest.config.ts.tpl'))
  }
}

export default JestGenerator
