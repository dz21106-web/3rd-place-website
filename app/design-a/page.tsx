import type { Metadata } from 'next'
import DesignAClient from './DesignAClient'

// デザイン検討用の試作ページ。検索エンジンには載せない
export const metadata: Metadata = {
  title: 'Design A（試作）',
  robots: { index: false, follow: false },
}

export default function DesignAPage() {
  return <DesignAClient />
}
