import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { services } from '@/lib/site-content'
import type { ServicePageData } from '@/lib/service-pages'
import { FaqList } from './faq-list'
import { ArrowIcon, ServiceIcon } from './icons'

export function ServiceDetailPage({ data }: { data: ServicePageData }) {
  const otherServices = services.filter((service) => service.id !== data.id)

  return (
    <>
      <section className="service-page-hero" aria-labelledby="service-page-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="面包屑">
            <ol>
              <li><Link href="/">首页</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{data.label}</li>
            </ol>
          </nav>
          <div className="service-page-introduction">
            <div>
              <p className="eyebrow">{data.eyebrow}</p>
              <p className="service-page-label">{data.label} · 服务概览</p>
              <h1 id="service-page-heading">{data.headline}</h1>
              <p className="service-page-description">{data.description}</p>
              <div className="hero-actions">
                <Button asChild><a href="#service-scope">了解服务范围<ArrowIcon /></a></Button>
                <Button asChild variant="outline"><a href="#preparation">准备咨询问题</a></Button>
              </div>
              <p className="service-page-disclaimer">虚构品牌 · 演示内容 · 不接收真实个人资料</p>
            </div>
            <aside className="service-page-guide" aria-label="本页导览">
              <span className="service-icon"><ServiceIcon type={data.id} /></span>
              <p>先了解，再准备。</p>
              <nav aria-label="页面区块导航">
                <a href="#service-scope"><span>01 / 服务范围</span><ArrowIcon /></a>
                <a href="#preparation"><span>02 / 咨询准备</span><ArrowIcon /></a>
                <a href="#service-faq"><span>03 / 常见问题</span><ArrowIcon /></a>
                <a href="#official-resources"><span>04 / 官方信息</span><ArrowIcon /></a>
              </nav>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" id="service-scope" aria-labelledby="scope-heading">
        <div className="container">
          <div className="section-heading service-detail-heading">
            <div><p className="eyebrow">WHAT TO EXPLORE</p><h2 id="scope-heading">把大问题，拆成具体的准备。</h2></div>
            <p>{data.scopeIntro}</p>
          </div>
          <div className="service-topic-grid">
            {data.topics.map((topic, index) => (
              <article className="service-topic" key={topic.title}>
                <span className="service-topic-number">0{index + 1}</span>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <ul>{topic.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-preparation" id="preparation" aria-labelledby="preparation-heading">
        <div className="container service-preparation-grid">
          <div>
            <p className="eyebrow">BEFORE YOUR FIRST CONVERSATION</p>
            <h2 id="preparation-heading">开始前，先整理这几件事。</h2>
            <p>{data.preparationIntro}</p>
            <Link className="text-link" href="/contact">查看联系与咨询准备<ArrowIcon /></Link>
          </div>
          <ol className="preparation-list">
            {data.preparation.map((item, index) => (
              <li key={item}><span>0{index + 1}</span><p>{item}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section faq-section" id="service-faq" aria-labelledby="service-faq-heading">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">QUESTIONS ABOUT {data.eyebrow}</p>
            <h2 id="service-faq-heading">关于{data.label}，<br />你可能想了解。</h2>
            <p className="section-description">先说明范围，再展开交流。</p>
          </div>
          <FaqList items={data.questions} />
        </div>
      </section>

      <section className="section" id="official-resources" aria-labelledby="resources-heading">
        <div className="container service-resource-grid">
          <div>
            <p className="eyebrow">CHECK THE OFFICIAL SOURCE</p>
            <h2 id="resources-heading">回到来源，核实信息。</h2>
            <p className="section-description">以下官方资料会在新标签页打开，<br />请以对应页面的最新内容为准。</p>
          </div>
          <div className="service-resource-list">
            {data.resources.map((resource) => (
              <a className="service-resource" key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer">
                <span><strong>{resource.title}</strong><span>{resource.description}</span></span>
                <ArrowIcon />
                <span className="sr-only">（在新标签页打开）</span>
              </a>
            ))}
            <p className="service-boundary-note">{data.note}</p>
          </div>
        </div>
      </section>

      <section className="section related-services" aria-labelledby="related-services-heading">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">KEEP EXPLORING</p><h2 id="related-services-heading">也可以继续了解。</h2></div></div>
          <nav className="related-services-grid" aria-label="其他服务">
            {otherServices.map((service) => (
              <Link key={service.id} href={service.href}>
                <ServiceIcon type={service.id} />
                <span><strong>{service.name}</strong><span>{service.title}</span></span>
                <ArrowIcon />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  )
}
