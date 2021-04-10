import { AvailableConfigKeys } from '../constants'

export type DependenciesFromFunction = (
  selectedConfigKeys: AvailableConfigKeys[]
) => string[]

export interface ConfigGenerator {
  key: string
  file?: string
  dependencies?: string[] | DependenciesFromFunction
  devDependencies?: string[] | DependenciesFromFunction
  echoAfter?: string
  execAfter?: string
  // 检测当前配置项是否已存在
  checkExist(): Promise<boolean>
  // 生成配置文件
  generateConfig(selectedConfigKeys: AvailableConfigKeys[]): Promise<boolean>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
