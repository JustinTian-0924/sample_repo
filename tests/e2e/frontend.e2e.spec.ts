import { test, expect } from '@playwright/test'

test.use({ reducedMotion: 'reduce' })

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

  test('desktop navigation reaches the relevant homepage sections', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    const navigation = page.getByRole('navigation', { name: '主导航', exact: true })
    await navigation.getByRole('link', { name: '留学规划', exact: true }).click()
    await expect(page).toHaveURL(/\/#study$/)
    await expect(page.locator('#study')).toBeInViewport()

    await navigation.getByRole('link', { name: '咨询准备', exact: false }).click()
    await expect(page).toHaveURL(/\/#contact$/)
    await expect(page.getByRole('heading', { name: /下一步，\s*从一个好问题开始。/ })).toBeInViewport()
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
    await expect(page).toHaveURL(/\/#visa$/)
    await expect(navigation).toBeHidden()

    const fitsViewport = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    )
    expect(fitsViewport).toBe(true)
  })
})
