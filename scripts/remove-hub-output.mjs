import { existsSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const rootDir = process.cwd()
const siteConfigPath = join(rootDir, 'lib', 'site.ts')

function isHubPublicEnabled() {
  const source = readFileSync(siteConfigPath, 'utf8')
  const match = source.match(/hubPublic:\s*(true|false)/)

  if (!match) {
    throw new Error('Could not determine FEATURE_FLAGS.hubPublic from lib/site.ts')
  }

  return match[1] === 'true'
}

function removeFileIfPresent(relativePath) {
  const targetPath = join(rootDir, relativePath)

  if (!existsSync(targetPath)) {
    return
  }

  rmSync(targetPath)
  console.log(`Removed ${relativePath} because hubPublic is false.`)
}

if (!isHubPublicEnabled()) {
  removeFileIfPresent('out/hub.html')
  removeFileIfPresent('out/hub.txt')
}
