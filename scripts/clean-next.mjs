/**
 * npm run dev の前に .next フォルダ（Next.js のキャッシュ）を消す。
 *
 * 以前は `rm -rf .next`（Mac/Linux 専用コマンド）だったが、
 * Windows でも動くように Node.js の fs.rmSync で消している。
 */
import { rmSync } from 'node:fs'

rmSync('.next', { recursive: true, force: true })
