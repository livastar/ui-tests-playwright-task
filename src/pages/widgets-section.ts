import { expect, Locator, Page } from '@playwright/test';

export class Widgets {
  static clickAddRowButton() {
    throw new Error('Method not implemented.');
  }
  readonly widgets: Page;
  readonly checkBoxLabel: Locator;
  constructor(page: Page) {
    this.widgets = page;
    this.checkBoxLabel = this.widgets.locator("[id*='CheckBox-label']");
  }

  // not loged in header
  readonly checkBoxSubtitle = () => this.widgets.locator("//*[contains(text(), 'Checkbox Widgets')]");

  public async userShouldBeLoggedIn() {
    await expect(this.checkBoxSubtitle()).toBeVisible();
    await expect(this.checkBoxLabel).toHaveText('Check all days that you are available:', { useInnerText: true });
  }
}
