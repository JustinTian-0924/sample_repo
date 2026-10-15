import type { Metadata } from 'next'
import Link from 'next/link'

import { PageIntro } from '@/components/site/page-intro'
import { ArrowIcon } from '@/components/site/icons'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '关于我们',
  description: '了解 MaplePath 虚构品牌的服务理念、演示团队与网站使用范围。',
}

const team = [
  { name: '林知远', character: '林', role: '学习规划 · 模拟角色', description: '以整理学习兴趣、目标和申请准备问题为演示职责。' },
  { name: '陈以宁', character: '陈', role: '信息整理 · 模拟角色', description: '以整理服务信息、记录疑问和梳理沟通事项为演示职责。' },
]

export default function AboutPage() {
  return (
    <>
      <PageIntro label="关于我们" eyebrow="THE MAPLEPATH APPROACH" title="认真了解你，才有清晰的下一步。" description="MaplePath 是一个加拿大留学咨询网站的虚构品牌，用来呈现清晰、透明、有条理的服务体验。" />
      <section className="section">
        <div className="container about-grid">
          <div className="about-statement">
            <p className="eyebrow">OUR APPROACH</p>
            <h2>从理解开始，<br />把问题一步步理清。</h2>
            <p>网站围绕留学规划、签证准备与移民公开信息组织内容。我们希望展示的，是先听需求、再说明范围，最后列出下一步的沟通方式。</p>
            <p>这里没有真实客户经历、申请成功率或专业执照声明。具体申请条件和个案判断仍应回到官方信息与适当的专业意见。</p>
          </div>
          <div className="about-values">
            <article><span>01 / 先了解目标</span><h3>让交流从你的问题开始。</h3><p>先记录学习背景、兴趣与期待，再讨论需要进一步核实的方向。</p></article>
            <article><span>02 / 说清楚范围</span><h3>把信息、准备与个案意见分开。</h3><p>说明哪些内容是公开信息，哪些问题需要专业人士结合具体情况判断。</p></article>
            <article><span>03 / 保持有序沟通</span><h3>把下一步写成清单。</h3><p>将待了解、待准备和待确认的事项分别整理，减少遗漏。</p></article>
          </div>
        </div>
      </section>
      <section className="section related-services" aria-labelledby="team-heading">
        <div className="container">
          <div className="section-heading"><div><p className="eyebrow">ILLUSTRATIVE TEAM</p><h2 id="team-heading">认识两位演示成员。</h2></div><p>以下姓名、角色均为虚构，<br />不代表真实员工或专业资质。</p></div>
          <div className="team-grid">
            {team.map((person) => (
              <article className="team-card" key={person.name}>
                <span className="team-initial" aria-hidden="true">{person.character}</span>
                <div><h3>{person.name}</h3><span className="demo-label">{person.role}</span><p>{person.description}</p></div>
              </article>
            ))}
          </div>
          <div className="info-page-actions"><Button asChild><Link href="/contact">准备第一次交流<ArrowIcon /></Link></Button><Link className="text-link" href="/privacy">阅读隐私说明</Link></div>
        </div>
      </section>
    </>
  )
}
