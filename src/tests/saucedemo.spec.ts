import { expect, test } from '@playwright/test';
import { test as login } from '@playwright/test';
import { TablePage } from '../pages/table-page';
import { LoginPage } from '../pages/login-page';

test.describe('Login Test: @rep1', () => {
  login.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    await page.locator('#login').type('test@test.com');
    await page.locator('#password').type('test');
    await page.locator('#loginBtn').click();
    await expect(page.locator('.navigation')).toHaveText(/QA Automation Web/);
  });
  test(`Check if user can filter by descending price: @rep2`, async ({ page }) => {
   const onTablePage = new TablePage(page);
  });
});
