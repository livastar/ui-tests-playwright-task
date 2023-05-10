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

    await page.locator('[role=treeitem][aria-expanded]', { hasText: 'Text Input' }).locator('img').click();
    await page.locator(`text='Text Input'`).click();

    const frame = page.frameLocator("[id*='RichText-area']");
    await frame.locator('body').type(message);
    await expect(frame.locator('body')).toHaveText(message);
  });

  test(`Check what happens if user clicks on Normal Button @hihi`, async ({ page }) => {
    const sectionSubTitle = 'Basic Button';
    const message = 'Stop poking me';
    await page.getByRole('treeitem', { name: sectionSubTitle, exact: true }).getByText(sectionSubTitle).click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe(message);
      expect(dialog.type()).toBe('alerts');
      dialog.accept().catch(() => {});
    });
    await page.getByRole('button', { name: 'Normal Button' }).click();
  });

  test(`Check if user could add/remove a new table row @ha`, async ({ page, baseURL }) => {
    const modifiedUrl = baseURL.replace('CwCheckBox', 'CwFlexTable');
    await page.goto(modifiedUrl, { waitUntil: 'networkidle' });

    const tableRows = page.locator('table.cw-FlexTable > tbody > tr');
    await expect(tableRows).toHaveCount(3);
    await page.locator('table.cw-FlexTable > tbody > tr ').getByRole('button', { name: 'Add a row' }).click();
    await page.locator('table.cw-FlexTable > tbody > tr ').getByRole('button', { name: 'Add a row' }).click();
    await expect(tableRows).toHaveCount(5);
  });
});
