/**
 * npm run build の前に、開発サーバー（npm run dev）が動いていないかを確認する。
 *
 * なぜ必要か:
 *   dev サーバーが動いたまま build すると、両方が .next フォルダを書き換えて
 *   壊れたビルドができることがある。動いていたら build を止める。
 *
 * 以前は lsof（Mac 専用）で調べていたが、Windows でも動くように
 * 「3000番ポートに接続できるか」を Node.js で直接試す方式にしている。
 */
import { createConnection } from 'node:net'

const PORT = 3000

function isListening(host) {
  return new Promise((resolve) => {
    const socket = createConnection({ port: PORT, host })
    socket.setTimeout(500)
    socket.once('connect', () => {
      socket.destroy()
      resolve(true)
    })
    socket.once('timeout', () => {
      socket.destroy()
      resolve(false)
    })
    socket.once('error', () => resolve(false))
  })
}

const results = await Promise.all([isListening('127.0.0.1'), isListening('::1')])

if (results.some(Boolean)) {
  console.error(
    `ERROR: dev server is running on port ${PORT}. Stop it (Ctrl+C in the dev terminal) before running build.`
  )
  process.exit(1)
}
