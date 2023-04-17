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
    const message = 'Hello World';
    const sectionTitle = 'Text Input';
    const sectionSubTitle = 'Rich Text';

    await onWidgetsSection.userShouldBeLoggedIn();

    await page.locator('[role=treeitem][aria-expanded]', { hasText: sectionTitle }).locator('img').click();
    await page.locator(`text=${sectionSubTitle}`).click();

    const frame = page.frameLocator("[id*='RichText-area']");
    await frame.locator('body').type(message);
    await expect(frame.locator('body')).toHaveText(message);
  });

  test(`Check what happens if user clicks on Normal Button @hihi`, async ({ page }) => {
    const sectionSubTitle = 'Basic Button';
    const message = 'Stop poking me';
    await page.getByRole('treeitem', { name: sectionSubTitle, exact: true }).getByText(sectionSubTitle).click();

    page.once('dialog', async (dialog) => {
      console.log(`------------------------------------------------------------------------------------------------`);
      console.log(`+_+_+_++__+_+_+_+_+_+_+_+_ ${dialog.message()} +_+_+_++__+_+_+_+_+_+_+_+_`);
      console.log(`+_+_+_++__+_+_+_+_+_+_+_+_ ${dialog.type()} +_+_+_++__+_+_+_+_+_+_+_+_`);
      console.log(`------------------------------------------------------------------------------------------------`);
      expect(dialog.message()).toBe(message);
      expect(dialog.type()).toBe('alerts');
      dialog.accept().catch(() => {});
    });
    await page.getByRole('button', { name: 'Normal Button' }).click();
  });
});
