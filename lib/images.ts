/**
 * 写真パスを、表示サイズに合った軽量な WebP 版に差し替えるヘルパー。
 *
 * scripts/optimize-images.mjs が元の .jpg / .png から 3 サイズを作っている。
 * 元パス（例 '/images/events/curry/curry12.jpg'）を配列やデータ側の
 * 「正」として持ったまま、使う場所ごとに必要な大きさを選べるようにする。
 *
 *   thumb … 長辺 400px  ロゴ、アイコン、64px 以下の小さいサムネ
 *   card  … 長辺 800px  一覧カード、ヒーローの写真帯、コラージュ
 *   full  … 長辺1600px  ライトボックス、モーダルの拡大表示
 *
 * 使い方: <Image src={img(src, 'card')} ... />
 */
export type ImageSize = 'thumb' | 'card' | 'full'

const SUFFIX: Record<ImageSize, string> = {
  thumb: '-thumb.webp',
  card: '-card.webp',
  full: '.webp',
}

export function img(src: string, size: ImageSize = 'card'): string {
  return src.replace(/\.(jpe?g|png)$/i, SUFFIX[size])
}
