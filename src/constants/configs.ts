export const availableConfigs = {
  // 默认是否勾选
  babel: false,
  browserslist: true,
  commitlint: true,
  devmoji: true,
  docker: false,
  editorconfig: true,
  eslint: false,
  git: true,
  husky: true,
  jest: false,
  license: true,
  lintstaged: true,
  npm: false,
  nvm: false,
  prettier: true,
  readme: true,
  stylelint: false,
  typescript: true,
  y2s: false,
}

export type AvailableConfigs = keyof typeof availableConfigs
