import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://samples.gwtproject.org/samples/Showcase/Showcase.html#!CwBasicButton');

  await page.getByText('Basic Button').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Normal Button' }).click();
});