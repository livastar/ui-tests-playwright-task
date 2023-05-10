import { expect, Locator, Page } from '@playwright/test';

export class TablePage {
  readonly tablePage: Page;

  readonly nameRows: Locator;
  readonly fruitRows: Locator;
  readonly tableInput: Locator;

  constructor(page: Page) {
    this.tablePage = page;

    this.tableInput = this.tablePage.locator('fsa');

    this.nameRows = this.tablePage.locator('fsa:nth-child(1)');
    this.fruitRows = this.tablePage.locator('fsa:nth-child(2)');
  }

  async filterByName(text: string) {
    // actions to enter text in input field
    await this.tableInput.type(text, { delay: 200 });

    for (const nameRow of await this.nameRows.all()) {
      await expect(nameRow).toHaveText(text);
    }
    expect(await this.nameRows.all()).toBe(5);
  }
}
