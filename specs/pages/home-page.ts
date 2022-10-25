import { expect, Page } from "@playwright/test";

export class HomePage {

    readonly homePage: Page;
    constructor(page: Page) {
        this.homePage = page;
    }

    // not loged in header
    readonly logInButton = () => this.homePage.locator("[data-gtm='button/log_in_als_abonnee']");
    readonly subscribeButton = () => this.homePage.locator("[data-gtm='button/abonneren']");
    readonly initialText = (text: string) => this.homePage.locator("[data-pexi-template='LOGIN_PAGE_TOP_VK']", { hasText: text });

    // loged in header
    readonly searchButton = () => this.homePage.locator("[data-gtm='header/zoeken']", { hasText: 'Zoeken' });
    readonly editieButton = () => this.homePage.locator("[data-gtm='header/krant']", { hasText: 'Editie' });
    readonly serviceButton = () => this.homePage.locator("[data-gtm='header / menu']", { hasText: 'Service' });

    // popUp GDPR
    readonly popupIframe = () => this.homePage.frameLocator("iframe[id^='sp_message_iframe']");
    readonly acceptCookies = () => this.popupIframe().locator("button[title='Akkoord']");

    public async userShouldBeLoggedIn() {
        await expect(this.logInButton()).not.toBeVisible();
        await expect(this.subscribeButton()).not.toBeVisible();

        await expect(this.searchButton()).toBeVisible();
        await expect(this.editieButton()).toBeVisible();
        await expect(this.serviceButton()).toBeVisible();
    }

}
