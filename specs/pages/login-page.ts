import { Locator, Page } from "@playwright/test";
import CONFIG from "../../config";


export class LoginPage {

    usernameField: Locator;
    submitButton: Locator;
    passwordField: Locator;

    readonly loginPage: Page;
    constructor(page: Page) {
        this.loginPage = page;
        this.usernameField = this.loginPage.locator('input#username');
        this.submitButton = this.loginPage.locator('button[type=submit]', { hasText: 'Ga verder' });
    }

    public async login(username?: string, password?: string) {
        const userName = username || CONFIG.USER_NAME;
        const userPassword = password || CONFIG.USER_PASSWORD;

        await this.usernameField.fill(userName);
        await this.submitButton.click({ delay: 2000 });

        await this.loginPage.locator('input#password').fill(userPassword);

        this.submitButton = this.loginPage.locator('button[type=submit]', { hasText: 'Log in' });
        await this.submitButton.click({ delay: 2000 });
    }

}
