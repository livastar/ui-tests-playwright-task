import { test, expect } from '@playwright/test';
import { Widgets as WidgetsSection } from '../pages/widgets-section';


test(`Basic Popup: @tables1`, async ({ page }) => {
  const sectionTitle = 'Tables';
  const sectionSubTitle = 'Flex Table';
  await page.goto('/');
  await page.getByRole('treeitem', { name: sectionTitle }).getByRole('img').click();
  await page.getByText(sectionSubTitle).click();
  const images = await page.$$('#gwt-debug-cwFlexTable-1-0 img');
  console.log(`Number of images found inside cw-FlexTable: ${images.length}`);
  await page.waitForTimeout(2000);
});
