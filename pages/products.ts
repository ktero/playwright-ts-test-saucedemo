import { expect, type Locator, type Page } from '@playwright/test';
import { NavigationBar } from '../components/navigation-bar';

export class ProductsPage extends NavigationBar {
    readonly page: Page;

    // Define locators
    readonly productItem: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        // Initialize locators
        this.productItem = this.page.locator('[data-test="inventory-item"]');
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
            await this.assertNumberBesideCartIcon(itemCounter);
        }
    }

    private async addItemToCart(itemName: string) {
        await this.productItem.filter({ hasText: itemName }).getByRole('button', { name: 'Add to cart' }).click();
    }
}