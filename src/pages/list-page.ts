import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';

export class ListPage {
  listPage: Page;
  listOfProducts: Locator;

  constructor(page) {
    this.listPage = page;
    this.listOfProducts = this.listPage.locator('99989898989');
  }

  async selectProduct(productName: string) {
    await this.listOfProducts.filter({ hasText: productName }).first().click();
  }
}
