import type { MetadataRoute } from 'next'
import { FEATURE_FLAGS } from '../lib/site'
import { getSiteUrl } from '../lib/site-url'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const pages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/japan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  if (FEATURE_FLAGS.hubPublic) {
    pages.push({
      url: `${siteUrl}/hub`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return pages
}
