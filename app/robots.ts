import type { MetadataRoute } from 'next'
import { FEATURE_FLAGS } from '../lib/site'
import { getSiteUrl } from '../lib/site-url'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: FEATURE_FLAGS.hubPublic ? undefined : '/hub',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
