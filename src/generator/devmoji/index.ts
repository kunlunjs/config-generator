import { join } from 'path'
import { globExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const DevmojiGenerator: ConfigGenerator = {
  key: 'devmoji',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc: '🤖 🚀 ✨ Emojify your conventional commits with Devmoji',
  devDependencies: ['devmoji'],

  checkExist(): Promise<boolean> {
    return globExisted('.husky/prepare-commit-msg')
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, 'prepare-commit-msg'), {
      folderPath: '.husky'
    })
  }
}

export default DevmojiGenerator
