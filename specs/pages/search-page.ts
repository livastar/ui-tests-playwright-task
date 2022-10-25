import { expect, Locator, Page } from "@playwright/test";

export class SearchPage {

    headerSearchButton: Locator;
    headerServiceButton: Locator;

    pageTitle: Locator;
    searchField: Locator;
    searchButton: Locator;

    pageSubTitle: Locator;
    columnisten: Locator;
    recensies: Locator;
    volkskueken: Locator;

    readonly searchPage: Page;
    constructor(page: Page) {
        this.searchPage = page;
        this.headerSearchButton = this.searchPage.locator("[data-gtm='header / search']");
        this.headerServiceButton = this.searchPage.locator("[data-gtm='header / menu']");

        this.pageTitle = this.searchPage.locator('#main-content > .page-title', { hasText: 'Zoeken' });
        this.searchField = this.searchPage.locator('form input[type=search]');
        this.searchButton = this.searchPage.locator('form input[type=submit]');

        this.pageSubTitle = this.searchPage.locator('#main-content > .page-subtitle', { hasText: 'Bladeren' });
        this.columnisten = this.searchPage.locator("#main-content .discover__card--columnisten");
        this.recensies = this.searchPage.locator("#main-content .discover__card--recensies");
        this.volkskueken = this.searchPage.locator("#main-content .discover__card--volkskueken");
    }

    readonly searchResultCounter = () => this.searchPage.locator('.search-results');

    readonly searchResultArticles = () => this.searchPage.locator('article.teaser--compact');


    public async shouldSeeSearchResultsFor(searchText: string) {
        await expect(this.searchField).toHaveValue(searchText);
        await expect(this.searchResultCounter()).toBeVisible();
        await expect(this.searchResultCounter()).toContainText(new RegExp(`\\d\{1,5\}\\sresultaten\\svoor\\s${searchText.replace(' ', '\\s')}`));
        await expect(await (this.searchResultArticles().count())).toBeGreaterThanOrEqual(50);
    }

    public async searchFor(searchText: string) {
        await this.searchField.fill(searchText);
        await this.searchButton.click({ delay: 1000 });
    }

    public async clickOnSearchCategory(category: string) {
        switch (category) {
            case SearchCategory.Columnisten:
                await this.columnisten.click({ delay: 1000 });
                break;
            case SearchCategory.Recensies:
                await this.recensies.click({ delay: 1000 });
                break;
            case SearchCategory.Volkskueken:
                await this.volkskueken.click({ delay: 1000 });
                break;
        }
    }

}

export const SearchCategory = { Columnisten: 'Columnisten', Recensies: 'Recensies', Volkskueken: 'Volkskueken' };
