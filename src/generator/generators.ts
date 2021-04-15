import BabelGenerator from './babel'
import BrowserslistGenerator from './browserslist'
import CommitlintGenerator from './commitlint'
import DevmojiGenerator from './devmoji'
import DockerGenerator from './docker'
import EditorconfigGenerator from './editorconfig'
import EslintGenerator from './eslint'
import GitGenerator from './git'
import HuskyGenerator from './husky'
import JestGenerator from './jest'
import LicenseGenerator from './license'
import LintStagedGenerator from './lintstage'
import NpmGenerator from './npm'
import NvmGenerator from './nvm'
import PrettierGenerator from './prettier'
import ReadmeGenerator from './readme'
import StylelintGenerator from './stylelint'
import TypescriptGenerator from './typescript'
import Y2sGenerator from './y2s'

export const availableConfigs = {
  babel: BabelGenerator,
  browserslist: BrowserslistGenerator,
  commitlint: CommitlintGenerator,
  devmoji: DevmojiGenerator,
  docker: DockerGenerator,
  editorconfig: EditorconfigGenerator,
  eslint: EslintGenerator,
  git: GitGenerator,
  husky: HuskyGenerator,
  jest: JestGenerator,
  license: LicenseGenerator,
  lintstaged: LintStagedGenerator,
  npm: NpmGenerator,
  nvm: NvmGenerator,
  prettier: PrettierGenerator,
  readme: ReadmeGenerator,
  stylelint: StylelintGenerator,
  typescript: TypescriptGenerator,
  y2s: Y2sGenerator
} as const

export type AvailableConfigs = typeof availableConfigs

export type AvailableConfigKeys = keyof AvailableConfigs
