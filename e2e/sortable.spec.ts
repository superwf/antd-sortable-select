import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/')

  // Click .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow >> nth=0
  await page
    .locator(
      '.ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow',
    )
    .first()
    .click()

  // Click .ant-select-item-option-content >> nth=0
  await page.locator('.ant-select-item-option-content').first().click()

  // Click div:nth-child(2) > .ant-select-item-option-content
  await page.locator('div:nth-child(2) > .ant-select-item-option-content').click()

  // Click div:nth-child(3) > .ant-select-item-option-content
  await page.locator('div:nth-child(3) > .ant-select-item-option-content').click()
  await page.dragAndDrop('span[role="button"]:has-text("C")', '.ant-select-selection-overflow-item', {
    targetPosition: {
      x: 10,
      y: 10,
    },
  })

  // await page.pause()

  // Click span[role="button"]:has-text("C")
  // await page.locator('span[role="button"]:has-text("C")').click()
})
