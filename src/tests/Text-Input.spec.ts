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

  test(`Basic Test: @xnn1`, async ({ page }) => {
    const sectionTitle = 'Text Input';
    const sectionSubTitle = 'Basic Text';
    await onWidgetsSection.userShouldBeLoggedIn();

    await page.locator('[role=treeitem][aria-expanded]', { hasText: sectionTitle }).locator('img').click();
    await page.locator(`text=${sectionSubTitle}`).click();
    await page.locator('#gwt-debug-cwBasicText-textbox').fill(sectionTitle);
    await page.locator('#gwt-debug-cwBasicText-textbox').click();
    const numLetters = sectionTitle.length;
    console.log(`Number of letters: ${numLetters}`);
  });

  test(`Rich Text: @xnn2`, async ({ page }) => {
    const message = 'Text';
    const sectionTitle = 'Text Input';
    const sectionSubTitle = 'Rich Text';

    await onWidgetsSection.userShouldBeLoggedIn();
    await page.locator('[role=treeitem][aria-expanded]', { hasText: sectionTitle }).locator('img').click();
    await page.locator(`text=${sectionSubTitle}`).click();
    await page.getByRole('button', { name: 'Toggle Bold' }).click();
    const frame = page.frameLocator("[id*='RichText-area']");
    await frame.locator('body').type(message);
    await expect(frame.locator('body')).toHaveText(message);
  });
});
