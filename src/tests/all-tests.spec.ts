import { test, expect } from '@playwright/test';
import { Widgets as WidgetsSection } from '../pages/widgets-section';

const message = 'Hello World';
const sectionTitle = 'Text Input';
const sectionSubTitle = 'Rich Text';
const sectionSubTitle1 = 'Basic Text'; //new const created

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
    await expect(page).toHaveURL(`${testBaseURL}`);
  });

  test(`Verify input and retrieval of text in Basic text field: @first`, async ({ page }) => {

    await page.locator('[role=treeitem][aria-expanded]', { hasText: sectionTitle }).locator('img').click();
    await page.locator(`text=${sectionSubTitle1}`).click();
    await page.locator('//*[@id="gwt-debug-cwBasicText-textbox"]').fill('Mihail'); //need to more steps

  });


  test(`Verify formatting and input in rich text editor: @second`, async ({ page }) => {

    await onWidgetsSection.userShouldBeLoggedIn();

    await page.locator('[role=treeitem][aria-expanded]', { hasText: sectionTitle }).locator('img').click();
    await page.locator(`text=${sectionSubTitle}`).click();

    const frame = page.frameLocator("[id*='RichText-area']");
    await frame.locator('body').type(message);
    await expect(frame.locator('body')).toHaveText(message);  //fails on firefox at this step, + needs one more step: text to be formated
  });

  test(`Check what happens if user clicks on Normal Button @hihi`, async ({ page }) => {
    const sectionSubTitle = 'Basic Button';
    const message = 'Stop poking me!';
    await page.getByRole('treeitem', { name: sectionSubTitle, exact: true }).getByText(sectionSubTitle).click();

    page.once('dialog', async (dialog) => {
      console.log(`------------------------------------------------------------------------------------------------`);
      console.log(`+_+_+_++__+_+_+_+_+_+_+_+_ ${dialog.message()} +_+_+_++__+_+_+_+_+_+_+_+_`);
      console.log(`+_+_+_++__+_+_+_+_+_+_+_+_ ${dialog.type()} +_+_+_++__+_+_+_+_+_+_+_+_`);
      console.log(`------------------------------------------------------------------------------------------------`);
      expect(dialog.message()).toBe(message);
      expect(dialog.type()).toBe('alert');
      dialog.accept().catch(() => { });
    });
    await page.getByRole('button', { name: 'Normal Button' }).click();
  });


  test('Check the sample DialogBox is displayed, then close it by clicking on Close button and check it is hidden: @third', async ({ page }) => {
    const sectionSubTitle2 = 'Dialog Box';

    await page.locator('[role=treeitem][aria-expanded]', { hasText: 'Popups' }).locator('img').click();
    await page.locator(`text=${sectionSubTitle2}`).click();
    await page.locator('button:text("Show Dialog Box")').click();
    await expect(page.locator('//*[@id="gwt-debug-cwDialogBox"]')).toBeVisible;
    await expect(page.locator('//*[@id="gwt-debug-cwDialogBox-caption"]')).toHaveText('Sample DialogBox');
    //await expect(page.locator('//*[@id="gwt-debug-cwDialogBox-content"]')).toHaveText('This is an example of a standard dialog box component.');
    //need some help with line 72
    await page.locator('button:text("Close")').click();
    await expect(page.locator('//*[@id="gwt-debug-cwDialogBox"]')).toBeHidden();

  });


  test('Click menu item and verify popup message is displayed: @Menu Bar', async ({ page }) => {
    await page.locator('[role=treeitem][aria-expanded]', { hasText: 'Lists and Menus' }).locator('img').click();
    await page.locator(`text=Menu Bar`).click();
    await page.locator('//*[@id="gwt-debug-cwMenuBar-item0"]').hover();
    await page.locator('//*[@id="gwt-debug-cwMenuBar-item0-item0"]').click();
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('A fine selection indeed'); //don't know how to close pop-up

    });

  });


  test('Verify checking and unchecking functionality: @Checkbox', async ({ page }) => {

    await page.getByLabel('Monday').check();
    await page.getByLabel('Tuesday').check();
    await page.getByLabel('Wednesday').check();
    await page.getByLabel('Thursday').check();
    await page.getByLabel('Friday').check();
    //expect(await page.getByLabel('Monday, Tuesday, Wednesday, Thursday, Friday').isChecked()).toBeTruthy();
    await page.getByLabel('Monday').uncheck();
    await page.getByLabel('Tuesday').uncheck();
    await page.getByLabel('Wednesday').uncheck();
    await page.getByLabel('Thursday').uncheck();
    await page.getByLabel('Friday').uncheck();
    //expect(await page.getByLabel('Monday, Tuesday, Wednesday, Thursday, Friday').isChecked()).toBeFalsy();
  });

  test('Verify selecting and toggling radio buttons: @Radio Button', async ({ page }) => {



  });

});
