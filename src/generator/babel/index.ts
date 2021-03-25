import { copyFile } from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import { commonConfigExisted, configInPackageJSON, globExisted } from "../../utils"
import { ConfigGenerator } from "../abstract"

const BabelGenerator: ConfigGenerator = {
  key: 'babel',

  checkExist(): Promise<boolean> {
    return commonConfigExisted(BabelGenerator.key) || globExisted('babel.config.json') || configInPackageJSON(['babel'])
  },

  async generateConfig(): Promise<boolean> {
    const file = '.babelrc.js'
    try {
      await promisify(copyFile)(join(__dirname, file), join(process.cwd(), file))
      return true
    } catch (error) {
      return false
    }
  }

}

export default  BabelGenerator