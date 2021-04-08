import { copyFileSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'
import { ensureFileSync } from 'fs-extra'
import glob = require('fast-glob')

function run() {
  const pkgPath = join(__dirname, '../package.json')
  const tempPath = join(__dirname, '../node_modules/.package.json.bak')
  const arg = process.argv[2]
  try {
    if (arg === 'before') {
      // 删除package.json中无用字段
      ensureFileSync(tempPath)
      copyFileSync(pkgPath, tempPath)
      const pkgContent = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      delete pkgContent.scripts
      // 保留postpublish
      pkgContent.scripts = {
        postpublish: 'ts-node scripts/publish.ts after'
      }
      delete pkgContent.devDependencies
      delete pkgContent.publishConfig
      writeFileSync(pkgPath, JSON.stringify(pkgContent, null, 2))
      // 复制所有模板文件
      glob.sync('src/generator/*/!(index.ts)').forEach(temPath => {
        const copyTo = join(__dirname, '../', temPath.replace(/^src/, 'dist'))
        ensureFileSync(copyTo)
        copyFileSync(join(__dirname, '../', temPath), copyTo)
      })
    } else if (arg === 'after') {
      copyFileSync(tempPath, pkgPath)
      unlinkSync(tempPath)
    }
  } catch (error) {
    console.error(error)
  }
}

run()
