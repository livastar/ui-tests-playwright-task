import { test, expect } from '@playwright/test';
import { Widgets as WidgetsSection } from '../pages/widgets-section';

const sectionTitle = 'Popups';
const sectionSubTitle = 'Basic Popup';

test(`Basic Popup: @Smoke1`, async ({ page }) => {
  await page.goto('/');
  await page.getByRole('treeitem', { name: sectionTitle }).getByRole('img').click();
  await page.getByText(sectionSubTitle).click();
  await page.click('button.gwt-Button');
  const selector = 'div.gwt-HTML:has-text("Click anywhere outside this popup to make it disappear.")';
  await page.waitForSelector(selector);

  const element = await page.$(selector);
  expect(element).not.toBeNull();
  console.log('Selector found successfully.');
  await page.click('//*[@id="gwt-debug-contentPanel"]/div[2]/div/div[2]/div/div[3]/div');
  await page.waitForSelector(selector, { state: 'hidden' });
  const hiddenElement = await page.$(selector);
  expect(hiddenElement).toBeNull();
  console.log('Selector not found .');
});

test(`Basic Popup 2: @Smoke2`, async ({ page }) => {
  await page.goto('/');
  await page.getByRole('treeitem', { name: sectionTitle }).getByRole('img').click();
  await page.getByText(sectionSubTitle).click();
  await page.click('//*[@id="gwt-debug-cwBasicPopup-thumb"]');
  await page.waitForSelector('//*[@id="gwt-debug-cwBasicPopup-imagePopup"]/div/img');
  const imgHandle = await page.$('//*[@id="gwt-debug-cwBasicPopup-imagePopup"]/div/img');
  const width = await imgHandle.getAttribute('width');
  const height = await imgHandle.getAttribute('height');
  expect(width).toBe('400');
  expect(height).toBe('290');
  console.log(`Width is : ${width}`);
  console.log(`Height is : ${height}`);

  await page.click('//*[@id="gwt-debug-contentPanel"]/div[2]/div/div[2]/div/div[3]/div');
  await page.waitForSelector('//*[@id="gwt-debug-cwBasicPopup"]', { state: 'hidden' });
});

test(`Digital Box: @Smoke3`, async ({ page }) => {
  await page.goto('/');
  await page.getByRole('treeitem', { name: sectionTitle }).getByRole('img').click();
  await page.getByText(sectionSubTitle).click();
  await page.getByText('Dialog Box').click();
  await page.getByRole('button', { name: 'Show Dialog Box' }).click();
  const dialogTopLocator = page.locator('tr.dialogTop');
  const dialogTopElement = await dialogTopLocator.elementHandle();

  const isConnected = await page.evaluate((element) => {
    return element.isConnected;
  }, dialogTopElement);

  // eslint-disable-next-line playwright/no-conditional-in-test
  if (isConnected) {
    console.log('The dialogTop element is present on the page.');
  } else {
    console.log('The dialogTop element is not present on the page.');
  }
  await page.getByRole('button', { name: 'Close' }).click();
  await page.waitForSelector('tr.dialogTop', { state: 'hidden' });

  // eslint-disable-next-line playwright/no-conditional-in-test
  if (await page.isVisible('tr.dialogTop')) {
    console.log('The dialogTop element is visible on the page.');
  } else {
    console.log('The dialogTop element is not visible on the page.');
  }
});
