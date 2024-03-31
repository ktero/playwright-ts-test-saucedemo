import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;

    // Define locators
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.completeHeader = this.page.locator('[data-test="complete-header"]');
        this.completeText = this.page.locator('[data-test="complete-text"]');
        this.backHomeButton = this.page.locator('[data-test="back-to-products"]');
    }

    async assertCheckoutIsComplete(expectedCompleteHeader: string, expectedCompleText: string) {
        expect(this.completeHeader).toHaveText(expectedCompleteHeader);
        expect(this.completeText).toHaveText(expectedCompleText);
    }

    async navigateToProductsPage() {
        await this.clickBackHomeButton();
        await expect(this.page).toHaveURL(/.*inventory.html/);
    }

    private async clickBackHomeButton() {
        await this.backHomeButton.click(); 
    }
}