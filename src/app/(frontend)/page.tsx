import Link from 'next/link'

import { CampusIllustration } from '@/components/site/campus-illustration'
import { FaqList } from '@/components/site/faq-list'
import { ArrowIcon, ServiceIcon } from '@/components/site/icons'
import { Button } from '@/components/ui/button'
import { frequentlyAskedQuestions, processSteps, services } from '@/lib/site-content'

export default function HomePage() {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" />YOUR NEXT CHAPTER</p>
            <p className="hero-location">加拿大留学 · 签证准备 · 未来规划</p>
            <h1 id="hero-heading">把留学的下一步，<br /><span>走得更清楚。</span></h1>
            <p className="hero-description">从第一次了解，到一份有条理的准备计划。<br className="desktop-break" />MaplePath 陪你梳理问题，让每一步都有方向。</p>
            <div className="hero-actions">
              <Button asChild><Link href="/#services">探索我们的服务<ArrowIcon /></Link></Button>
              <Button asChild variant="outline"><Link href="/#process">了解规划流程</Link></Button>
            </div>
            <div className="hero-footnote"><span className="small-maple">✦</span><span>新的篇章，从一个清晰的方向开始。</span></div>
          </div>
          <figure className="hero-artwork">
            <div className="artwork-caption"><span>枫叶之国，新的起点</span><span>CANADA / A NEW CHAPTER</span></div>
            <CampusIllustration />
            <figcaption><span>探索更适合自己的学习与生活方向</span><ArrowIcon /></figcaption>
          </figure>
        </div>
        <div className="container principles-strip">
          <p>好的规划，<strong>从认真了解你开始。</strong></p>
          <span>目标先行</span><span>准备有序</span><span>沟通透明</span>
          <span className="demo-label">虚构品牌 · 演示网站</span>
        </div>
      </section>

      <section className="section services-section" id="services" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">WHAT WE HELP WITH</p><h2 id="services-heading">你的目标，我们一起梳理。</h2></div>
            <p>无论处于哪个阶段，<br />都可以从了解下一步开始。</p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" id={service.id} key={service.id} aria-labelledby={`${service.id}-heading`}>
                <div className="service-card-top"><span className="service-icon"><ServiceIcon type={service.id} /></span><span>{service.number}</span></div>
                <p className="service-category">{service.category}</p>
                <h3 id={`${service.id}-heading`}>{service.name}</h3>
                <p className="service-tagline">{service.title}</p>
                <p className="service-description">{service.description}</p>
                <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
                <Link className="text-link" href={service.href}>{service.linkLabel}<ArrowIcon /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section" id="process" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">A CLEAR PATH FORWARD</p><h2 id="process-heading">从想法，到有序的下一步。</h2></div><p>把复杂的问题拆开，<br />让每一个阶段都更清晰。</p></div>
          <ol className="process-list">
            {processSteps.map((step, index) => (
              <li key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section about-section" id="about" aria-labelledby="about-heading">
        <div className="container about-grid">
          <div className="about-statement"><p className="eyebrow">THE MAPLEPATH APPROACH</p><h2 id="about-heading">认真对待，<br />每一个新的起点。</h2><p>规划不是替你做决定，<br />而是让你在了解之后，更有把握地选择。</p><span className="about-signature">MaplePath Consulting</span></div>
          <div className="about-values">
            <article><span>01 / 以目标为起点</span><h3>先听你的想法，再讨论方向。</h3><p>从学习经历、个人兴趣和期待出发，先了解需求，再整理适合讨论的问题。</p></article>
            <article><span>02 / 以清晰为标准</span><h3>把范围说清楚，把步骤列明白。</h3><p>服务内容、待准备事项和沟通节点分别说明，让信息更容易理解和核对。</p></article>
            <article><span>03 / 以信息为依据</span><h3>尊重事实，也说明边界。</h3><p>区分公开信息与个案意见，不作录取或获批保证，涉及具体条件时回到官方来源核实。</p></article>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq" aria-labelledby="faq-heading">
        <div className="container faq-grid">
          <div><p className="eyebrow">GOOD QUESTIONS, FIRST</p><h2 id="faq-heading">出发前，<br />你可能想了解。</h2><p className="section-description">先回答常见的问题，<br />再开始更具体的交流。</p><a className="text-link" href="#contact">查看咨询准备清单<ArrowIcon /></a></div>
          <FaqList items={frequentlyAskedQuestions} />
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <div className="container contact-grid">
          <div><p className="eyebrow">LET’S START WITH YOU</p><h2 id="contact-heading">下一步，<br />从一个好问题开始。</h2><p>不必一次想清楚所有事情。<br />先把这三件事写下来，为第一次交流做好准备。</p><p className="contact-demo-note">本演示网站不接收真实咨询或个人资料。</p></div>
          <div className="consultation-checklist"><p className="checklist-label">你的咨询准备清单</p><ol><li><span>01</span><div><h3>我想了解什么？</h3><p>留学规划、签证准备，或移民相关信息。</p></div></li><li><span>02</span><div><h3>我希望什么时候开始？</h3><p>整理大致时间安排，以及已经完成的准备。</p></div></li><li><span>03</span><div><h3>我最想确认的三个问题？</h3><p>把疑问列出来，让交流更有重点。</p></div></li></ol></div>
        </div>
      </section>
    </>
  )
}
