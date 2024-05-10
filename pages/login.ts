import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    // Define locators
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly homePageTitle: Locator;
    private readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.usernameField = page.locator('[data-test="username"]')
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton  = page.locator('[data-test="login-button"]');
        this.homePageTitle = page.locator('.title');
        this.loginErrorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    }

    async performLogin(username: string, password: string, isValidLogin: boolean = true) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton(isValidLogin);
    }

    async getLoginErrorMessage(): Promise<string> {
        return await this.loginErrorMessage.innerText();
    }

    private async enterUsername(username: string) {
        await this.usernameField.fill(username);
    }

    private async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    private async clickLoginButton(isValidLogin: boolean) {
        await this.loginButton.click();

        if (isValidLogin) {
            await expect(this.page).toHaveURL(/.*inventory.html/);
            await expect(this.homePageTitle).toHaveText('Products');
        } else {
            await expect(this.page).toHaveURL('https://www.saucedemo.com/');
        }
    }
}