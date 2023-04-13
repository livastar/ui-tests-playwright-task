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

  test(`Basic Test: @Smoke`, async ({ page }) => {
    await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[3]/div[1]/div/div[1]/img');
    await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[3]/div[2]/div/div[1]/div[1]/div/div/div[2]');
    await page.fill('#gwt-debug-cwBasicText-textbox', 'text');

    
    
  });

  test(`Rich Text: @Smoke`, async ({ page }) => {
    await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[3]/div[1]/div/div[1]/img');
    await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[3]/div[2]/div/div[1]/div[2]/div/div/div[2]');
    await page.click('div.CMWVMEC-b-e:has-text("Rich Text")');

    
    await page.waitForTimeout(2000);

  });
});
