import { expect, Locator, Page } from '@playwright/test';

export class PopupModal {
  readonly popupModal: Page;

  readonly title: Locator;
  readonly subTitle: Locator;
  readonly image: Locator;
  readonly closeButton: Locator;
  readonly baseSelector = '#gwt-debug-cwDialogBox';

  constructor(page: Page) {
    this.popupModal = page;

    this.title = this.popupModal.locator(`${this.baseSelector} .dialogTop`, { hasText: 'Sample DialogBox' });
    this.subTitle = this.popupModal.locator(`${this.baseSelector} .gwt-HTML`, { hasText: 'This is an example of a standard dialog box component.' });
    this.image = this.popupModal.locator(`${this.baseSelector} [src^='data:image/jpeg']`);
    this.closeButton = this.popupModal.locator(`${this.baseSelector} [type=button]`);
  }

  public async shouldBeDisplayedPopupModalElements() {
    await expect(this.title).toBeVisible();
    await expect(this.subTitle).toBeVisible();
    await expect(this.image).toBeVisible();
    await expect(this.closeButton).toBeVisible();
  }
}
