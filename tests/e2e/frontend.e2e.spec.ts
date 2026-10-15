import { test, expect } from '@playwright/test'

test.use({ contextOptions: { reducedMotion: 'reduce' } })

test.describe('Public homepage', () => {
  test('shows public content without an admin login', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle('MaplePath Consulting | 加拿大留学规划')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/把留学的下一步，\s*走得更清楚。/)
    await expect(page.getByRole('heading', { name: '留学规划', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: '签证协助', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: '移民信息', exact: true })).toBeVisible()
    await expect(page.getByRole('img', { name: '加拿大校园与山景插画' })).toBeVisible()
  })

  test('desktop navigation opens a service page and the contact page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    const navigation = page.getByRole('navigation', { name: '主导航', exact: true })
    await navigation.getByRole('link', { name: '留学规划', exact: true }).click()
    await expect(page).toHaveURL(/\/study$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('找到方向，再规划你的申请。')
    await expect(navigation.getByRole('link', { name: '留学规划', exact: true })).toHaveAttribute('aria-current', 'page')

    await navigation.getByRole('link', { name: '咨询准备', exact: false }).click()
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('先准备好问题，再开始交流。')
  })

  test('FAQ answers can be opened and closed', async ({ page }) => {
    await page.goto('/#faq')

    const question = page.locator('details').filter({
      has: page.locator('summary', { hasText: '第一次咨询前，需要准备什么？' }),
    })
    const answer = question.locator('p')

    await expect(answer).toBeHidden()
    await question.locator('summary').click()
    await expect(answer).toBeVisible()
    await question.locator('summary').click()
    await expect(answer).toBeHidden()
  })
})

const informationRoutes = [
  { path: '/about', title: '关于我们', headline: '认真了解你，才有清晰的下一步。' },
  { path: '/contact', title: '联系我们', headline: '先准备好问题，再开始交流。' },
  { path: '/privacy', title: '隐私说明', headline: '了解信息如何使用，再开始浏览。' },
]

test.describe('Information pages', () => {
  for (const route of informationRoutes) {
    test(`${route.path} loads, refreshes, and fits a 320px viewport`, async ({ page }) => {
      const response = await page.goto(route.path)
      expect(response?.status()).toBe(200)
      await expect(page).toHaveTitle(`${route.title} | MaplePath Consulting`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.headline)
      await page.reload()
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.headline)
      await page.setViewportSize({ width: 320, height: 780 })
      const fitsViewport = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      )
      expect(fitsViewport).toBe(true)
    })
  }

  test('about, contact, and privacy are connected without exposing a submission form', async ({ page }) => {
    await page.goto('/study')
    await page.getByRole('navigation', { name: '主导航', exact: true }).getByRole('link', { name: '关于我们', exact: true }).click()
    await expect(page).toHaveURL(/\/about$/)
    await page.getByRole('link', { name: '准备第一次交流', exact: false }).click()
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.locator('main form')).toHaveCount(0)
    await page.getByRole('link', { name: '阅读隐私与使用说明', exact: false }).click()
    await expect(page).toHaveURL(/\/privacy$/)
  })
})

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('supports Escape, closes after selecting a link, and fits the viewport', async ({ page }) => {
    await page.goto('/')

    const navigation = page.locator('#primary-navigation')
    await expect(navigation).toBeHidden()
    await page.getByRole('button', { name: '展开主导航' }).click()
    await expect(navigation).toBeVisible()
    await expect(page.getByRole('button', { name: '收起主导航' })).toHaveAttribute('aria-expanded', 'true')

    await page.keyboard.press('Escape')
    await expect(navigation).toBeHidden()
    await expect(page.getByRole('button', { name: '展开主导航' })).toBeFocused()

    await page.getByRole('button', { name: '展开主导航' }).click()
    await navigation.getByRole('link', { name: '签证协助', exact: true }).click()
    await expect(page).toHaveURL(/\/visa$/)
    await expect(navigation).toBeHidden()

    const fitsViewport = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    )
    expect(fitsViewport).toBe(true)
  })
})

const serviceRoutes = [
  { path: '/study', label: '留学规划', headline: '找到方向，再规划你的申请。' },
  { path: '/visa', label: '签证协助', headline: '把信息理清，让准备更有序。' },
  { path: '/immigration', label: '移民信息', headline: '先了解信息，再讨论未来。' },
]

test.describe('Service detail pages', () => {
  for (const service of serviceRoutes) {
    test(`${service.path} supports direct visits, refresh, preparation anchors and FAQ interaction`, async ({ page }) => {
      const response = await page.goto(service.path)
      expect(response?.status()).toBe(200)
      await expect(page).toHaveTitle(`${service.label} | MaplePath Consulting`)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(service.headline)

      const refreshed = await page.reload()
      expect(refreshed?.status()).toBe(200)
      const navigation = page.getByRole('navigation', { name: '主导航', exact: true })
      await expect(navigation.getByRole('link', { name: service.label, exact: true })).toHaveAttribute('aria-current', 'page')

      await page.getByRole('link', { name: '准备咨询问题', exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`${service.path}#preparation$`))
      await expect(page.getByRole('heading', { name: '开始前，先整理这几件事。', exact: true })).toBeInViewport()

      const question = page.locator('#service-faq details').first()
      await expect(question.locator('p')).toBeHidden()
      await question.locator('summary').click()
      await expect(question.locator('p')).toBeVisible()

      const officialLink = page.locator('#official-resources a').first()
      await expect(officialLink).toHaveAttribute('href', /^https:\/\/www\.canada\.ca\//)
      await expect(officialLink).toHaveAttribute('target', '_blank')
    })
  }

  test('homepage service cards open detail pages and breadcrumb returns home', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: '了解移民信息', exact: true }).click()
    await expect(page).toHaveURL(/\/immigration$/)
    await page.getByRole('navigation', { name: '面包屑', exact: true }).getByRole('link', { name: '首页', exact: true }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/把留学的下一步，\s*走得更清楚。/)
  })

  test('service pages fit a 320px mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 780 })

    for (const service of serviceRoutes) {
      await page.goto(service.path)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(service.headline)
      const fitsViewport = await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      )
      expect(fitsViewport, `${service.path} should not overflow horizontally`).toBe(true)
    }
  })
})
