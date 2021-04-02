import { join } from 'path'
import {
  globExisted,
  generateFromTemplateFile,
  configInPackageJSON,
  getPkgInfo,
  updatePkg,
} from '../../utils'
import { ConfigGenerator } from '../interface'

const LicenseGenerator: ConfigGenerator = {
  key: 'license',
  echoAfter:
    '你可能需要更改 LICENSE 和 package.json 文件中协议的说明，默认使用 GPL-3.0-or-later 协议。',

  async checkExist(): Promise<boolean> {
    return (await globExisted('LICENSE')) || configInPackageJSON(['license'])
  },

  async generateConfig(): Promise<boolean> {
    const pkg = getPkgInfo()
    return (
      (await generateFromTemplateFile(join(__dirname, 'LICENSE.tpl'), {
        interpolationValues: {
          name: (pkg!.name as string) ?? '<product name>',
          author: (pkg!.author as string) ?? '<author>',
          year: new Date().getFullYear(),
        },
      })) && (await updatePkg(this.key, ['license'], 'GPL-3.0-or-later'))
    )
  },
}

export default LicenseGenerator
