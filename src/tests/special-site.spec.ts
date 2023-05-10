import { expect, test } from '@playwright/test';
import { test as login } from '@playwright/test';
import { TablePage } from '../pages/table-page';
import { DetailsPage } from '../pages/details-page';
import { LoginPage } from '../pages/login-page';

test.describe('Special site tests: @Special', () => {
  login.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    await page.locator('#login').type('test@test.com');
    await page.locator('#password').type('test');
    await page.locator('#loginBtn').click();
    await expect(page.locator('.navigation')).toHaveText(/QA Automation Web/);
  });

  test(`Check if user can filter table by name/fruit: @Mihai`, async ({ page }) => {
    const onTablePage = new TablePage(page);
    // code to implement
    // select Table tab
    // Filter table by Name: Mia
    // check if table is filtered
    await onTablePage.filterByName('Mia');
    await onTablePage.shouldBeFilteredByName('Mia');
    // ----------------------------
    // Filter table by Fruit: mango
    // check if table is filtered
    await onTablePage.filterByFruit('Mango');
    await onTablePage.shouldBeFilteredByFruit('Mango');
  });

  test(`Check if user can fill form and see form filled: @Stefan`, async ({ page }) => {
    // code to implement
  });

  test(`Check if user can select from dropdown and see selected option displayed: @Petru`, async ({ page }) => {
    // open page with dropdown
    // select an option from dropdown (e.g. Option 2)
    // check if selected option is displayed
    const detailsPage = new DetailsPage(page);

    await detailsPage.selectOption('Option 2');
    await detailsPage.shouldHaveSelectedOption('Option 2');
  });

  test(`User should be able to add a product to a basket`, async ({ page }) => {
    // Login as registered user
    // On list page select a product
    // On Details Page click on Add to basket button
    // Check if user is redirected to the Basket page
    // Check if previously selected product is displayed in the Basket page

    await page.goto('https://www.saucedemo.com', { waitUntil: 'networkidle' });

    await page.locator('#user-name').type('standard_user');
    await page.locator('#password').type('secret_sauce');
    await page.locator('#login-button').click();

    await page.locator('.inventory_item', { hasText: 'Mango' }).click();
    await page.locator('#addToCartButton').click();

    await expect(page).toHaveURL(/.*\/cart/);
    await expect(page.locator('.inventory_item_name')).toHaveText('Mango');

    // Login as registered user
    // Implement test from the comments above
    // now rewrite this test using page objects
  });
});
