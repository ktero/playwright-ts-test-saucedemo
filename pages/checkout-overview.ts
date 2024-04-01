import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;

    // Define locators
    readonly cartItem: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.cartItem = this.page.locator('.cart_item');
        this.finishButton = this.page.locator('[data-test="finish"]');
    }

    async checkIfItemsExist(checkItems: string | string[]) {

        let items: string[] = typeof checkItems === 'string' ? [checkItems] : [...checkItems];
        let itemName: string;

        // Loop through each item in the cart list
        for (let i: number = 0; i < items.length; i++) {
            itemName = items[i];
            // Each item is unique so there should only be 1
            await expect(this.cartItem.filter( {hasText: itemName})).toHaveCount(1);
        }
    }

    async navigateToCheckoutCompletePage() {
        await this.clickFinishButton();
        await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    }

    private async clickFinishButton() {
        await this.finishButton.click(); 
    }
}