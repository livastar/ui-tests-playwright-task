import { test } from '@playwright/test';

test.describe('Special site tests: @Special', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
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
