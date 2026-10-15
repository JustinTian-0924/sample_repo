import type { Metadata } from 'next'
import Link from 'next/link'

import { PageIntro } from '@/components/site/page-intro'

export const metadata: Metadata = {
  title: '隐私说明',
  description: 'MaplePath 演示网站当前的信息使用、后台数据与使用范围说明。',
}

export default function PrivacyPage() {
  return (
    <>
      <PageIntro label="隐私说明" eyebrow="PRIVACY & DEMO USE" title="了解信息如何使用，再开始浏览。" description="本说明描述演示项目当前的数据使用方式。MaplePath 是虚构品牌，本网站不接收真实咨询申请。" />
      <article className="container section policy-content">
        <section aria-labelledby="privacy-scope"><h2 id="privacy-scope">1. 网站用途</h2><p>本站用于展示加拿大留学咨询网站的页面、内容组织与后台管理流程。演示人员、服务及联系方式不代表真实业务、员工或专业资质。</p></section>
        <section aria-labelledby="privacy-public"><h2 id="privacy-public">2. 公开页面与咨询准备</h2><p>当前公开页面没有咨询提交表单。服务准备清单只供阅读，不会把填写内容发送至后台，也不会创建咨询记录。请勿通过演示站点提供真实个人资料或申请文件。</p></section>
        <section aria-labelledby="privacy-admin"><h2 id="privacy-admin">3. 管理后台与媒体</h2><p>管理员账号、登录状态与后台上传的媒体由 Payload 管理。后台仅应用于演示数据，具备权限的管理员可按实际管理功能维护和删除内容。后台上传图片可以通过公开文件地址访问，因此不应上传私人资料。</p></section>
        <section aria-labelledby="privacy-technical"><h2 id="privacy-technical">4. 技术记录与登录状态</h2><p>管理后台可能使用身份验证 Cookie。服务器及反向代理可能按实际配置记录访问地址、请求路径、时间和错误信息。当前前台代码未接入营销追踪或第三方分析组件；部署后的日志设置需由站点管理者核对。</p></section>
        <section aria-labelledby="privacy-links"><h2 id="privacy-links">5. 外部资料与后续变化</h2><p>官方资料链接会打开对应外部网站，外部网站按其自身说明处理访问。若后续启用演示咨询表单，将同步说明实际收集字段、用途、访问权限与保存方式。</p></section>
        <section aria-labelledby="privacy-contact"><h2 id="privacy-contact">6. 了解演示范围</h2><p>可通过<Link href="/contact">联系与咨询准备页面</Link>了解当前演示范围。本站不提供真实咨询业务、个案法律意见或申请结果保证。</p></section>
      </article>
    </>
  )
}
