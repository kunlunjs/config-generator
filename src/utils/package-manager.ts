import { execFileSync } from 'child_process'
import { globExisted } from './common'

export type PackageManager = 'pnpm' | 'yarn' | 'npm'

/**
 * 获取当前位置所使用的包管理工具
 * 优先级A: lock -> cli
 * 优先级B： pnpm -> yarn -> npm
 */
export async function getPackageManager(): Promise<PackageManager | null> {
  if (await globExisted('pnpm-local.yaml')) {
    return 'pnpm'
  }
  if (await globExisted('yarn.lock')) {
    return 'yarn'
  }
  if (await globExisted('package-lock.json')) {
    return 'npm'
  }
  try {
    if (execFileSync('pnpm', ['-v'])) {
      return 'pnpm'
    }
  } catch (error) {
    //
  }
  try {
    if (execFileSync('yarn', ['-v'])) {
      return 'yarn'
    }
  } catch (error) {
    //
  }
  return null
}
