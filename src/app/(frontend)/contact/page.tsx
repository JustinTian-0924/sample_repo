import type { Metadata } from 'next'
import Link from 'next/link'

import { PageIntro } from '@/components/site/page-intro'
import { ArrowIcon } from '@/components/site/icons'
import { services } from '@/lib/site-content'

export const metadata: Metadata = {
  title: '联系我们',
  description: '了解 MaplePath 演示联系信息，整理服务方向、时间安排和咨询问题。',
}

export default function ContactPage() {
  return (
    <>
      <PageIntro label="联系我们" eyebrow="LET’S START WITH YOU" title="先准备好问题，再开始交流。" description="这里说明演示站点的联系范围，并帮助你整理第一次交流前的问题。本站不接收真实咨询申请或个人资料。" />
      <section className="section">
        <div className="container contact-page-grid">
          <div>
            <p className="eyebrow">DEMO CONTACT INFORMATION</p>
            <h2>联系信息（演示）</h2>
            <dl className="contact-information">
              <div><dt>品牌</dt><dd>MaplePath Consulting · 虚构品牌</dd></div>
              <div><dt>演示邮箱</dt><dd><code>hello@maplepath.example</code><span>仅为格式示例，不接收邮件。</span></dd></div>
              <div><dt>沟通方式</dt><dd>以线上初步交流作为演示场景。</dd></div>
              <div><dt>地址与电话</dt><dd>本项目未设置真实办公地址或联系电话。</dd></div>
            </dl>
            <Link className="text-link" href="/privacy">阅读隐私与使用说明<ArrowIcon /></Link>
          </div>
          <div className="contact-preparation-card" id="consultation-preparation">
            <p className="eyebrow">YOUR PREPARATION CHECKLIST</p>
            <h2>第一次交流前，整理三件事。</h2>
            <ol className="preparation-list">
              <li><span>01</span><p>选择想了解的服务方向，写下当前的目标。</p></li>
              <li><span>02</span><p>记录大致时间安排，以及已经完成的准备。</p></li>
              <li><span>03</span><p>列出最想确认的三个问题，暂不提供敏感文件。</p></li>
            </ol>
            <p className="service-boundary-note">这是一份阅读用清单，不会保存或发送信息。请勿提供真实护照、成绩单、财务文件或个人联系方式。</p>
          </div>
        </div>
      </section>
      <section className="section related-services" aria-labelledby="contact-services-heading">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">CHOOSE A TOPIC</p><h2 id="contact-services-heading">先了解你关心的方向。</h2></div></div>
          <nav className="contact-service-links" aria-label="选择咨询方向">
            {services.map((service) => <Link key={service.id} href={service.href}><span>{service.name}</span><ArrowIcon /></Link>)}
          </nav>
        </div>
      </section>
    </>
  )
}
