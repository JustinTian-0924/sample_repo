import Link from 'next/link'

type PageIntroProps = {
  label: string
  eyebrow: string
  title: string
  description: string
}

export function PageIntro({ label, eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="service-page-hero" aria-labelledby="public-page-heading">
      <div className="container">
        <nav className="breadcrumbs" aria-label="面包屑">
          <ol>
            <li><Link href="/">首页</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{label}</li>
          </ol>
        </nav>
        <div className="info-page-intro">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="public-page-heading">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  )
}
