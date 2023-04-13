import { test, expect } from '@playwright/test';
import { Widgets as WidgetsSection } from '../pages/widgets-section';


 test(`Basic Popup: @Smoke`, async ({ page }) => {
    await page.goto('/');
    await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[4]/div[1]/div/div[1]/img');
    await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[4]/div[2]/div/div[1]/div[1]/div/div/div[2]');
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

   test(`Basic Popup 2: @Smoke`, async ({ page }) => {
    await page.goto('/');
    await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[4]/div[1]/div/div[1]/img');
    await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[4]/div[2]/div/div[1]/div[1]/div/div/div[2]');
    await page.click('//*[@id="gwt-debug-cwBasicPopup-thumb"]');
    await page.waitForSelector('//*[@id="gwt-debug-cwBasicPopup-imagePopup"]/div/img');
    const imgHandle = await page.$('//*[@id="gwt-debug-cwBasicPopup-imagePopup"]/div/img');
    const width = await imgHandle.getAttribute('width');
    const height = await imgHandle.getAttribute('height');
    expect(width).toBe('400');
    expect(height).toBe('290');
    await page.click('//*[@id="gwt-debug-contentPanel"]/div[2]/div/div[2]/div/div[3]/div');
    await page.waitForSelector('//*[@id="gwt-debug-cwBasicPopup"]', { state: 'hidden' });
 
  });

  test(`Digital Box: @Smoke`, async ({ page }) => {
    await page.goto('/');
     await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[4]/div[1]/div/div[1]/img');
    await page.click('//*[@id="gwt-debug-mainMenu"]/div/div/div[1]/div[4]/div[2]/div/div[1]/div[2]/div/div/div[2]');
    
    await page.waitForTimeout(8000);
   
  });