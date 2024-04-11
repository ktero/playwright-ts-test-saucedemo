import { expect, type Locator, type Page } from '@playwright/test';

export class NavigationBar {
    readonly page: Page;

    // Define locators
    readonly shoppingCartLink: Locator;
    readonly hamburgerMenuLink: Locator;
    readonly hamburgerMenuList: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
        this.hamburgerMenuLink = this.page.locator('#react-burger-menu-btn');
        this.hamburgerMenuList = this.page.locator('.bm-item-list');
    }

    async performLogout() {
        await this.clickHamburgerMenu();
        await this.hamburgerMenuList.getByRole('link', { name: 'Logout' }).click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    }

    async navigateToAboutPage() {
        await this.clickHamburgerMenu();
        await this.hamburgerMenuList.getByRole('link', { name: 'About' }).click();
        await expect(this.page).toHaveURL('https://saucelabs.com/');
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

    private async clickHamburgerMenu() {
        await this.hamburgerMenuLink.click();
    }
}