import { join } from 'path'
import { globExisted, generateFromTemplateFile, getPkgInfo } from '../../utils'
import { ConfigGenerator } from '../interface'

const ReadmeGenerator: ConfigGenerator = {
  key: 'readme',
  echoAfter: '你可能需要更改 README 文件中的内容。',

  checkExist(): Promise<boolean> {
    return globExisted('README?(.md)')
  },

  async generateConfig(): Promise<boolean> {
    const pkg = getPkgInfo()
    return generateFromTemplateFile(join(__dirname, 'README.md'), {
      interpolationValues: {
        name: (pkg?.name as string) ?? '<product name>'
      }
    })
  }
}

export default ReadmeGenerator
