import { test, expect } from '@playwright/test';
import { Widgets as WidgetsSection } from '../pages/widgets-section';

test.describe('Tests @All', () => {
  let onWidgetsSection: WidgetsSection;
  let testBaseURL: string;

  test.beforeEach(async ({ page, baseURL }) => {
    onWidgetsSection = new WidgetsSection(page);

    testBaseURL = String(baseURL);
    await page.goto('', { waitUntil: 'networkidle' });
  });

  test(`User is presented with base page: @Smoke`, async ({ page }) => {
    await onWidgetsSection.userShouldBeLoggedIn();
    await expect(page).toHaveURL(`${testBaseURL}8`);
  });
});
