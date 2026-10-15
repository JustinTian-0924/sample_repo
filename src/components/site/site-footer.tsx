import Link from 'next/link'

import { siteNavigation } from '@/lib/site-content'
import { BrandMark } from './icons'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-introduction">
          <Link className="brand" href="/" aria-label="MaplePath Consulting 首页">
            <BrandMark />
            <span className="brand-name">MaplePath<span>CONSULTING</span></span>
          </Link>
          <p>每一个新的起点，都值得认真规划。</p>
          <span className="demo-label">虚构品牌 · 学习演示项目</span>
        </div>
        <nav className="footer-navigation" aria-label="页脚导航">
          <span className="footer-label">探索 MaplePath</span>
          {siteNavigation.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="footer-note">
          <span className="footer-label">关于这个网站</span>
          <p>这是一个加拿大留学咨询网站练习项目。品牌、服务内容均为演示，不代表真实公司或专业资质。</p>
          <a href="#privacy">隐私与使用说明 ↗</a>
        </div>
      </div>
      <div className="container footer-bottom" id="privacy">
        <p>© MaplePath Consulting · Demo</p>
        <p>请勿提供真实个人资料。本站不提供个案法律意见或申请结果保证。</p>
        <a href="#top">回到顶部 ↑</a>
      </div>
    </footer>
  )
}
