import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByText('Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitc').click();
  await page.getByText('Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitc').dblclick();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standart_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').press('Tab');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').press('ArrowLeft');
  await page.locator('[data-test="username"]').press('ArrowLeft');
  await page.locator('[data-test="username"]').press('ArrowLeft');
  await page.locator('[data-test="username"]').press('ArrowLeft');
  await page.locator('[data-test="username"]').press('ArrowLeft');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('#inventory_container').nth(1).click();
  await page.locator('.inventory_item_description').first().click();
});