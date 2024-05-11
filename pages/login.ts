import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private baseUrl: string;

    // Define locators
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly homePageTitle: Locator;
    private readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.baseUrl = "";

        // Initialize locators
        this.usernameField = page.locator('[data-test="username"]')
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton  = page.locator('[data-test="login-button"]');
        this.homePageTitle = page.locator('.title');
        this.loginErrorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('/');
        this.baseUrl = await this.page.url();
        await this.assertIsAtBasePage();
    }

    async performLogin(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async assertIsAtBasePage() {
        await expect(this.page).toHaveURL(this.baseUrl);
    }

    async assertLoginErrorIsDisplay() {
        await expect (this.loginErrorMessage).toBeVisible();
    }

    async assertActualLoginErrorMessageMatchesExpectedErrorMessage(expectedErrorMessage: string) {
        let actualErrorMessage: string = await this.getLoginErrorMessage();
        await expect(actualErrorMessage).toEqual(expectedErrorMessage);
    }

    async assertLoginIsSuccessful() {
        await expect(this.page).toHaveURL(/.*inventory.html/);
        await expect(this.homePageTitle).toHaveText('Products');
    }

    async assertLoginIsUnsuccessful() {
        await expect(this.page).toHaveURL(this.baseUrl);
    }

    private async getLoginErrorMessage(): Promise<string> {
        return await this.loginErrorMessage.innerText();
    }

    private async enterUsername(username: string) {
        await this.usernameField.fill(username);
    }

    private async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    private async clickLoginButton() {
        await this.loginButton.click();
    }
}