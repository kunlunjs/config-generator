import { join } from 'path'
import { globExisted, generateFromTemplateFile } from '../../utils'
import { ConfigGenerator } from '../interface'

const DockerGenerator: ConfigGenerator = {
  key: 'docker',
  select: {
    node: true,
    full: true
  },
  desc: 'Accelerate how you build, share and run modern applications',
  refUrl: [
    {
      label: 'Refrence',
      url: 'https://docs.docker.com/engine/reference/builder/'
    },
    {
      label: 'Nodejs best practices',
      url:
        'https://dev.to/nodepractices/docker-best-practices-with-node-js-4ln4'
    },
    {
      label: 'Frontend best practices',
      url:
        'https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html#Real-World-Example'
    }
  ],

  file: '.dockerignore',
  checkExist(): Promise<boolean> {
    return globExisted(this.file!)
  },

  async generateConfig(): Promise<boolean> {
    return generateFromTemplateFile(join(__dirname, '.dockerignore.tpl'))
  }
}

export default DockerGenerator
