import glob = require('fast-glob')
import { copyFileSync, ensureFileSync } from 'fs-extra'
import { join } from 'path'

export default function copyTemplates() {
  // 复制所有模板文件
  glob.sync('src/generator/*/!(index.ts)').forEach(temPath => {
    const copyTo = join(__dirname, '../', temPath.replace(/^src/, 'dist'))
    ensureFileSync(copyTo)
    copyFileSync(join(__dirname, '../', temPath), copyTo)
  })
}
