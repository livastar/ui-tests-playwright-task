import { test, expect } from '@playwright/test';

test('test for chromium-webdriver-university: @mySpecialTest', async ({ page }) => {
  await page.goto('', { waitUntil: 'networkidle' });
  await page.getByPlaceholder('First Name').type('fadfasdfasfasdfd - First Namee');
  await page.getByPlaceholder('Last Name').type('Last Name');
  await page.getByPlaceholder('Email Address').type('emailAddress@gadsdfa.cio');
  await page.getByPlaceholder('Comments').type('fasdfasdfasdfaosdfaosidhf asdofiajs dfasdofkajsd fa');
  await page.getByRole('button', { name: 'SUBMIT' }).click();
  await expect(page.getByRole('heading', { name: 'Thank You for your Message!' })).toBeVisible();
});
