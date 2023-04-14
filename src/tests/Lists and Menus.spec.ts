import { test, expect } from '@playwright/test';
import { Widgets as WidgetsSection } from '../pages/widgets-section';

test(`Basic Popup: @menu1`, async ({ page }) => {
  const sectionTitle = 'Lists and Menus';
  const sectionSubTitle = 'Menu Bar';
  await page.goto('/');
  await page.getByRole('treeitem', { name: sectionTitle }).getByRole('img').click();
  await page.getByText(sectionSubTitle).click();
});
