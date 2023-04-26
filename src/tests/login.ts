import { test } from '@playwright/test';

test(`Check if user could add/remove a new table row @ha`, async ({ page }) => {
  await page.goto('', { waitUntil: 'networkidle' });

  // login steps
  // USER=test@test.com
  // PASSWORD=test

  await page.context().storageState({ path: 'playwright-report/.auth/user.json' });
});
