import { test, expect } from '@playwright/test';
import { ColumnistenPage } from '../pages/category-pages/columnisten-category-page';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { SearchCategory, SearchPage } from '../pages/search-page';

test.describe('Tests @All', () => {

  let onHomePage: HomePage;
  let onLoginPage: LoginPage;
  let onSearchPage: SearchPage;
  let onColumnistenPage: ColumnistenPage;
  let testBaseURL: string;

  test.beforeEach(async ({ page, baseURL }) => {
    onHomePage = new HomePage(page);

    testBaseURL = String(baseURL);
    await page.goto('', { waitUntil: "domcontentloaded" });
    await onHomePage.acceptCookies().click();
  });

  test(`User is presented with home page loaded after loged in: @Smoke @TEST_JIRA_PROJECT_ID-1111`, async ({ page }) => {
    onLoginPage = new LoginPage(page);

    await onHomePage.logInButton().click({ delay: 500 });
    await onLoginPage.login();
    await onHomePage.userShouldBeLoggedIn();
    await expect(page).toHaveURL(`${testBaseURL}`);
  });

  test(`User is presented with search results: @Smoke @TEST_JIRA_PROJECT_ID-1111`, async ({ page }) => {
    onSearchPage = new SearchPage(page);

    await onHomePage.searchButton().click({ delay: 1000 });
    await onSearchPage.searchFor('jazz concert');
    await onSearchPage.shouldSeeSearchResultsFor('jazz concert');
  });

  test(`User is presented with category articles list: @Smoke @TEST_JIRA_PROJECT_ID-1111`, async ({ page }) => {
    onSearchPage = new SearchPage(page);
    onColumnistenPage = new ColumnistenPage(page);

    await onHomePage.searchButton().click({ delay: 1000 });
    await onSearchPage.clickOnSearchCategory(SearchCategory.Columnisten);
    await onColumnistenPage.shouldSeeCategoryArticles();
  });

});
