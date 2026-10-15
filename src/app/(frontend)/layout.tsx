import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import './styles.css'

export const metadata: Metadata = {
  description: 'MaplePath Consulting 演示网站：了解加拿大留学规划、签证准备与移民咨询信息，梳理你的下一步。',
  title: {
    default: 'MaplePath Consulting | 加拿大留学规划',
    template: '%s | MaplePath Consulting',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <div className="site-shell" id="top">
          <a className="skip-link" href="#main-content">跳到主要内容</a>
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
