const DEFAULT_SITE_URL = 'http://localhost:3000'

function normalizeUrl(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL

  if (!envUrl) {
    return DEFAULT_SITE_URL
  }

  const withProtocol = envUrl.startsWith('http') ? envUrl : `https://${envUrl}`
  return normalizeUrl(withProtocol)
}
