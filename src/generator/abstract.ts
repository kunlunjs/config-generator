export interface ConfigGenerator {
  key: string;
  // 检测当前配置项是否已存在
  checkExist(): Promise<boolean>
  // 生成配置文件
  generateConfig(): Promise<boolean>
}