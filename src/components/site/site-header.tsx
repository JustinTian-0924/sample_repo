'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { siteNavigation } from '@/lib/site-content'
import { BrandMark } from './icons'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="MaplePath Consulting 首页"
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark />
          <span className="brand-name">MaplePath<span>CONSULTING</span></span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          ref={menuButton}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? '收起主导航' : '展开主导航'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          <span>菜单</span>
        </button>
        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          aria-label="主导航"
        >
          {siteNavigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/#contact" onClick={() => setMenuOpen(false)}>咨询准备 ↗</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
