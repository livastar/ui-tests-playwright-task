import { expect, Page } from '@playwright/test';

export class HomePage {
  readonly homePage: Page;
  constructor(page: Page) {
    this.homePage = page;
  }

  // not loged in header
  readonly logInButton = () => this.homePage.locator("[data-gtm='button/log_in_als_abonnee']");
  readonly serviceButton = () => this.homePage.locator("[data-gtm='header / menu']", { hasText: 'Service' });

  public async userShouldBeLoggedIn() {
    await expect(this.logInButton()).toBeHidden();
    await expect(this.serviceButton()).toBeVisible();
  }
}
