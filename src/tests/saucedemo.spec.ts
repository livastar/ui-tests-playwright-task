import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test.describe('Special site tests: @rep1', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com', { waitUntil: 'networkidle' });
    loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
  });
});
