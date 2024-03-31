import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;

    // Define locators
    readonly productSortContainer: Locator;
    readonly productItem: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.productSortContainer = this.page.locator('[data-test="product-sort-container"]');
        this.productItem = this.page.locator('[data-test="inventory-item"]');
        this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
    }

    async performAddItemsToCart(itemToAdd: string | string[]) {
        
        let items: string[] = typeof itemToAdd === 'string' ? [itemToAdd] : [...itemToAdd];
        let itemName: string;
        let itemCounter: number = 0;
        
        // Loop to add all given items to the shopping cart
        for (let i: number = 0; i < items.length; i++) {
            itemName = items[i];
            await this.addItemToCart(itemName);
            itemCounter++;
            // Assert total number of items added in the shopping cart
            await expect(this.shoppingCartLink).toHaveText(`${itemCounter}`);
        }
    }

    async navigateToCartPage() {
        await this.clickShoppingCart();
        await expect(this.page).toHaveURL(/.*cart.html/);
    }

    private async addItemToCart(itemName: string) {
        await this.productItem.filter({ hasText: itemName }).getByRole('button', { name: 'Add to cart' }).click();
    }

    private async clickShoppingCart() {
        await this.shoppingCartLink.click(); 
    }
}