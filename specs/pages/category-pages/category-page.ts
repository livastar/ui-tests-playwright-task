import { expect, Locator, Page } from "@playwright/test";

export class CategoryPage {

    pageTitle: Locator;
    filterButton: Locator;
    authorsFilterList: Locator;


    readonly categoryPage: Page;
    constructor(page: Page) {
        this.categoryPage = page;
        this.pageTitle = this.categoryPage.locator('.page-element-title-overview__text');
        this.filterButton = this.categoryPage.locator('.results-filter > a');
        this.authorsFilterList = this.categoryPage.locator('.results-filter > ul > li');
    }

    public async open(path: string) {
        this.categoryPage.goto(path, { waitUntil: "networkidle" });
    }

    readonly articlesList = () => this.categoryPage.locator('.list-container article');

    public async shouldSeeCategoryArticles(articlesNumber: number) {
        await expect(await (this.articlesList().count())).toBeGreaterThanOrEqual(articlesNumber);
    }

}
