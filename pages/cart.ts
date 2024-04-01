import { expect, type Locator, type Page } from '@playwright/test';
import { NavigationBar } from '../components/navigation-bar';

export class CartPage extends NavigationBar {
    readonly page: Page;

    // Define locators
    readonly cartItem: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        // Initialize locators
        this.cartItem = this.page.locator('.cart_item');
        this.checkoutButton = this.page.locator('[data-test="checkout"]')
    }

    async checkIfAddedItemsExist(checkItems: string | string[]) {

        let items: string[] = typeof checkItems === 'string' ? [checkItems] : [...checkItems];
        let itemName: string;

        // Loop through each item in the cart list
        for (let i: number = 0; i < items.length; i++) {
            itemName = items[i];
            // Each item is unique so there should only be 1
            await this.assertItemExistInShoppingCart(itemName);
        }
    }

    async removeAddedItemsInTheCart(removeItems: string | string[]) {

        let items: string[] = typeof removeItems === 'string' ? [removeItems] : [...removeItems];
        let itemName: string;
        let currentNumberOfItemsInCart: number = await this.getNumberBesideCartIcon();
        
        // Loop through array of items to remove
        for (let i: number = 0; i < items.length; i++) {
            itemName = items[i];

            // Find item and click the 'Remove' button
            await this.cartItem.filter( {hasText: itemName}).getByRole('button', { name: 'Remove' }).click();
            currentNumberOfItemsInCart -= 1;
            await this.assertNumberBesideCartIcon(currentNumberOfItemsInCart);
        }
    }

    async navigateToCheckoutInformationPage() {
        await this.clickCheckoutButton();
        await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
    }

    private async assertItemExistInShoppingCart(itemName: string) {
        await expect(this.cartItem.filter( {hasText: itemName})).toHaveCount(1);
    }

    private async clickCheckoutButton() {
        await this.checkoutButton.click(); 
    }
}