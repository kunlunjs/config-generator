import { updatePkg } from '../../utils'
import { ConfigGenerator } from '../interface'

const HuskyGenerator: ConfigGenerator = {
  key: 'husky',
  select: {
    default: true,
    front: true,
    full: true,
    node: true
  },
  desc: 'Modern native Git hooks made easy',
  refUrl: 'https://typicode.github.io/husky/',
  devDependencies: ['husky'],
  execAfter: 'npx husky install',

  checkExist(): Promise<boolean> {
    return Promise.resolve(false)
  },

  async generateConfig(): Promise<boolean> {
    return updatePkg(this.key, ['scripts', 'postinstall'], 'husky install')
  }
}

export default HuskyGenerator
