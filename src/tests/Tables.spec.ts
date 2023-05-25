import { test, expect } from '@playwright/test';
import { Widgets as WidgetsSection } from '../pages/widgets-section';

test(`Basic Popup: @tables1`, async ({ page }) => {
  const sectionTitle = 'Tables';
  const sectionSubTitle = 'Flex Table';
  await page.goto('/');
  await page.getByRole('treeitem', { name: sectionTitle }).getByRole('img').click();
  await page.locator(`text=${sectionSubTitle}`).click();
  const tableRows = page.locator('table.cw-FlexTable > tbody > tr');
  await expect(tableRows).toHaveCount(3);
  await page.locator('table.cw-FlexTable > tbody > tr ').getByRole('button', { name: 'Add a Row' }).click();
  await expect(tableRows).toHaveCount(4);
});
