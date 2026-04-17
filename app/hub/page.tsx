import { notFound } from 'next/navigation'
import { FEATURE_FLAGS } from '../../lib/site'

export default function HubPage() {
  if (!FEATURE_FLAGS.hubPublic) {
    notFound()
  }

  return null
}
