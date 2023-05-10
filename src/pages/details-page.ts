import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';

export class DetailsPage {
  readonly detailsPage: Page;
  readonly fruitRows: Locator;
  readonly dropdown: Locator;
  readonly addToCartButton: Locator;
  readonly productPageDescription: Locator;
  readonly subtitle: Locator;
  readonly removeFromCartButton: Locator;

  constructor(page: Page) {
    this.detailsPage = page;
    this.fruitRows = this.detailsPage.locator('99989898989');
    this.dropdown = this.detailsPage.locator('99989898989');
    this.addToCartButton = this.detailsPage.locator('99989898989');
    this.productPageDescription = this.detailsPage.locator('#productDescription');
    this.subtitle = this.detailsPage.locator('#productSubtitle');
    this.removeFromCartButton = this.detailsPage.locator('#removeFromCartButton');
  }

  async shouldHaveSelectedOption(arg0: string) {
    await expect(this.fruitRows).toHaveText(arg0);
  }

  async selectOption(arg0: string) {
    await this.dropdown.selectOption(arg0);
  }

  async clickOnAddToCartButton() {
    await this.addToCartButton.click();
  }

  async shouldSeeProductInformation(productName: string) {
    await expect(this.productPageDescription).toHaveText(productName);
    await expect(this.subtitle).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.removeFromCartButton).toBeHidden();
  }
}
