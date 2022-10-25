import { Page } from "@playwright/test";
import { CategoryPage } from "./category-page";

export class ColumnistenPage extends CategoryPage {

    readonly columnistenPage: CategoryPage;

    constructor(page: Page) {
        super(page);
        this.columnistenPage = new CategoryPage(page);
        this.columnistenPage.pageTitle = this.pageTitle.locator('text=Columnisten');
    };

    public override async shouldSeeCategoryArticles() {
        await super.shouldSeeCategoryArticles(10);
    }

}
