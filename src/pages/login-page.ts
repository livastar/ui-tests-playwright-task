import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';

export class LoginPage {
  loginPage: Page;
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  errorMessage: Locator;

  constructor(page) {
    this.loginPage = page;

    this.usernameInput = this.loginPage.locator('#user-name');
    this.passwordInput = this.loginPage.locator('#password');
    this.loginButton = this.loginPage.locator('#login-button');
    this.errorMessage = this.loginPage.locator('#errorMessage');
  }
  async login(username, password) {
    await this.usernameInput.type(username);
    await this.passwordInput.type(password);
    await this.loginButton.click();
  }
  async shouldSeeErrorMessage(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }
}
