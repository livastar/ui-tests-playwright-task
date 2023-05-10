import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ListPage } from '../pages/list-page';
import { DetailsPage } from '../pages/details-page';

test.describe('Special site tests: @Special', () => {
  let loginPage: LoginPage;
  let listPage: ListPage;
  let detailsPage: DetailsPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com', { waitUntil: 'networkidle' });
    loginPage = new LoginPage(page);
    listPage = new ListPage(page);
    detailsPage = new DetailsPage(page);

    await loginPage.login('standard_user', 'secret_sauce');
    await listPage.selectProduct('Sauce Labs Backpack');
  });

  test(`User should be able to add a prodduct to a basket`, async ({ page }) => {
    const cartPage = new CartPage(page);

    await detailsPage.clickOnAddToCartButton();
    await cartPage.shouldHaveProduct('Sauce Labs Backpack');
  });

  test(`User should be able to view a details page of an item`, async ({}) => {
    await detailsPage.shouldSeeProductInformation('Sauce Labs Backpack');
  });
});
