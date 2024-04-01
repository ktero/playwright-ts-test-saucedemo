import { expect, type Locator, type Page } from '@playwright/test';

export class NavigationBar {
    readonly page: Page;

    // Define locators
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
    }

    async getNumberBesideCartIcon(): Promise<number> {
        let numberBesidesCartIcon: string = await this.shoppingCartLink.innerText();
        return +numberBesidesCartIcon;
    }

    async assertNumberBesideCartIcon(expectedNumber: number) {
        await expect(this.shoppingCartLink).toHaveText(`${expectedNumber}`);
    }

    async navigateToCartPage() {
        await this.clickShoppingCart();
        await expect(this.page).toHaveURL(/.*cart.html/);
    }

    private async clickShoppingCart() {
        await this.shoppingCartLink.click(); 
    }
}