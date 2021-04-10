export const availableConfigs = {
  babel: {
    // 默认是否勾选
    default: false,
    desc: 'Use next generation JavaScript, today.'
  },
  browserslist: {
    default: true,
    desc:
      'The config to share target browsers and Node.js versions between different front-end tools.'
  },
  commitlint: {
    default: true,
    desc: 'Lint commit messages'
  },
  devmoji: {
    default: true,
    desc: '🤖 🚀 ✨ Emojify your conventional commits with Devmoji'
  },
  docker: {
    default: false,
    desc: 'Accelerate how you build, share and run modern applications'
  },
  editorconfig: {
    default: true,
    desc:
      'Helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs'
  },
  eslint: {
    default: false,
    desc: 'Find and fix problems in your JavaScript code'
  },
  git: {
    default: true,
    desc: 'Version control system'
  },
  husky: {
    default: true,
    desc: 'Modern native Git hooks made easy'
  },
  jest: {
    default: false,
    desc: 'A delightful JavaScript Testing Framework with a focus on simplicity'
  },
  license: {
    default: true,
    desc: 'Project license instruction'
  },
  lintstaged: {
    default: true,
    desc:
      "Run linters against staged git files and don't let 💩 slip into your code base!"
  },
  npm: {
    default: false,
    desc: "Npm's configuration"
  },
  nvm: {
    default: false,
    desc: 'A version manager for node.js'
  },
  prettier: {
    default: true,
    desc: 'An opinionated code formatter'
  },
  readme: {
    default: true,
    desc: 'Tell others about your project'
  },
  stylelint: {
    default: false,
    desc:
      'A mighty, modern linter that helps you avoid errors and enforce conventions in your styles'
  },
  typescript: {
    default: true,
    desc: "Javascript's superset with type safe"
  },
  y2s: {
    default: false,
    desc: 'Yapi to service code generator'
  }
}

export type AvailableConfigs = typeof availableConfigs

export type AvailableConfigKeys = keyof AvailableConfigs
