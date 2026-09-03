/**
 * public/images の写真から、表示サイズに合わせた軽量な WebP 版を作る。
 *
 * なぜ必要か:
 *   next.config.mjs で images.unoptimized = true にしている（静的書き出しでは
 *   Next.js の画像最適化サーバーが使えないため）。つまり元の写真がそのまま
 *   配信される。2000px超・1MB超の写真を 224px の枠に出していたので、
 *   スマホでスクロールすると写真が届くまで数秒かかっていた。
 *
 * 作るもの（元ファイルは消さない。差分ビルドのため既存が新しければスキップ）:
 *   foo.jpg → foo-thumb.webp (長辺 400px) … ロゴ・アイコン・小さいサムネ
 *           → foo-card.webp  (長辺 800px) … 一覧カード・ヒーローの写真帯
 *           → foo.webp       (長辺1600px) … ライトボックス・モーダルの拡大表示
 *
 * 実行: npm run images   (npm run build からも自動で走る)
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const PUBLIC_DIR = join(ROOT, 'public')
const SCAN_DIRS = ['app', 'components', 'lib']

/** 生成する版の一覧。suffix が空文字なら foo.webp になる。 */
const VARIANTS = [
  { suffix: '-thumb', maxSize: 400, quality: 72 },
  { suffix: '-card', maxSize: 800, quality: 74 },
  { suffix: '', maxSize: 1600, quality: 78 },
]

const SOURCE_EXT = /\.(jpe?g|png)$/i

/** ソースコードを再帰的に集める */
function collectSourceFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) collectSourceFiles(full, acc)
    else if (/\.(tsx?|jsx?|mjs)$/.test(entry.name)) acc.push(full)
  }
  return acc
}

/** コード中に書かれている "/images/..." のパスを全部拾う */
function findReferencedImages() {
  const found = new Set()
  for (const dir of SCAN_DIRS) {
    const abs = join(ROOT, dir)
    if (!existsSync(abs)) continue
    for (const file of collectSourceFiles(abs)) {
      const text = readFileSync(file, 'utf8')
      for (const match of text.matchAll(/['"`](\/images\/[^'"`]+?\.(?:jpe?g|png))['"`]/gi)) {
        found.add(match[1])
      }
    }
  }
  return [...found].sort()
}

/** 出力が元ファイルより新しければ作り直さない */
function isUpToDate(srcPath, outPath) {
  if (!existsSync(outPath)) return false
  return statSync(outPath).mtimeMs >= statSync(srcPath).mtimeMs
}

async function main() {
  const refs = findReferencedImages()
  const missing = []
  let created = 0
  let skipped = 0
  let srcBytes = 0
  let outBytes = 0

  for (const ref of refs) {
    const srcPath = join(PUBLIC_DIR, ref)
    if (!existsSync(srcPath)) {
      missing.push(ref)
      continue
    }
    srcBytes += statSync(srcPath).size

    for (const { suffix, maxSize, quality } of VARIANTS) {
      const outPath = join(
        dirname(srcPath),
        ref.split('/').pop().replace(SOURCE_EXT, '') + suffix + '.webp'
      )
      if (isUpToDate(srcPath, outPath)) {
        skipped++
      } else {
        await sharp(srcPath)
          .rotate() // スマホ写真の向き情報（EXIF）を反映してから縮小する
          .resize({ width: maxSize, height: maxSize, fit: 'inside', withoutEnlargement: true })
          .webp({ quality })
          .toFile(outPath)
        created++
      }
      outBytes += statSync(outPath).size
    }
  }

  const mb = (b) => (b / 1048576).toFixed(2) + 'MB'
  console.log(
    `[images] 対象 ${refs.length}枚 / 生成 ${created}件 / 据え置き ${skipped}件`
  )
  console.log(`[images] 元 ${mb(srcBytes)} → WebP 3サイズ合計 ${mb(outBytes)}`)

  if (missing.length) {
    console.error(`[images] 参照されているのに実ファイルが無い画像 ${missing.length}件:`)
    for (const m of missing) console.error(`  - ${m}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('[images] 変換に失敗しました:', err)
  process.exit(1)
})
