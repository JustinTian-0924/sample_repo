import type { Metadata } from 'next'

import { ServiceDetailPage } from '@/components/site/service-detail-page'
import { servicePages } from '@/lib/service-pages'

const content = servicePages.study

export const metadata: Metadata = {
  title: content.label,
  description: content.description,
}

export default function StudyPage() {
  return <ServiceDetailPage data={content} />
}
