import { expect, test } from '@playwright/test';
import { test as login } from '@playwright/test';

test.describe('Special site tests: @Special', () => {
  login.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    await page.locator('#login').type('test@test.com');
    await page.locator('#password').type('test');
    await page.locator('#loginBtn').click();
    await expect(page.locator('.navigation')).toHaveText(/QA Automation Web/);
  });

  test(`Check if user can filter table by name/fruit: @Mihai`, async ({ page }) => {
    // code to implement
  });

  test(`Check if user can fill form and see form filled: @Stefan`, async ({ page }) => {
    // code to implement
  });

  test(`Check if user can select from dropdown and see selected option displayed: @Petru`, async ({ page }) => {
    // code to implement
  });
});
