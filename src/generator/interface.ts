import { AvailableConfigKeys } from './generators'

export type DependenciesFromFunction = (
  selectedConfigKeys: AvailableConfigKeys[]
) => string[]

export interface Generator {
  // 记录日志用
  key: string
  // 是否默认勾选
  select?: {
    // 默认模式
    default?: boolean
    // 前端模板模式
    front?: boolean
    // NodeJs模版模式
    node?: boolean
    // 全栈模板模式
    full?: boolean
  }
  // 当前配置的简单描述
  desc: string
  // 一般用于记录模板文件
  file?: string
  // 运行时依赖收集
  dependencies?: string[] | DependenciesFromFunction
  // 开发时依赖收集
  devDependencies?: string[] | DependenciesFromFunction
  // 配置参考文档地址
  refUrl?: string | { label: string; url: string }[]
  // 文案打印
  echoAfter?: string
  // 依赖安装后执行
  execAfter?: string
  // 检测当前配置项是否已存在
  checkExist(): Promise<boolean>
  // 生成配置文件
  generateConfig(selectedConfigKeys: AvailableConfigKeys[]): Promise<boolean>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type ConfigGenerator = Readonly<Generator>

export type TemplateKyes = keyof NonNullable<ConfigGenerator['select']>
