import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutInformationPage {
    readonly page: Page;

    // Define locators
    readonly firstNameInputText: Locator;
    readonly lastNameInputText: Locator;
    readonly postalOrZipCodeInputText: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.firstNameInputText = this.page.locator('[data-test="firstName"]');
        this.lastNameInputText = this.page.locator('[data-test="lastName"]');
        this.postalOrZipCodeInputText = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
    }

    async performFillUpCheckoutInformation(firstName: string, lastName: string, postalOrZipCode: string) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPostalOrZipCode(postalOrZipCode);
    }

    async navigateToCheckoutOverViewPage() {
        await this.clickContinueButton();
        await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
    }

    private async enterFirstName(firstName: string) {
        await this.firstNameInputText.fill(firstName);
    }

    private async enterLastName(lastName: string) {
        await this.lastNameInputText.fill(lastName);
    }

    private async enterPostalOrZipCode(postalOrZipCode: string) {
        await this.postalOrZipCodeInputText.fill(postalOrZipCode);
    }

    private async clickContinueButton() {
        await this.continueButton.click();
    }
}