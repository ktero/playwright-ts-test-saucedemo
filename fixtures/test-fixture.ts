import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { ProductsPage } from '../pages/products';
import { CartPage } from '../pages/cart';
import { CheckoutInformationPage } from '../pages/checkout-information';
import { CheckoutOverviewPage } from '../pages/checkout-overview';
import { CheckoutCompletePage } from '../pages/checkout-complete';

type TestFixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutInformationPage: CheckoutInformationPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage
}

export const test = base.extend<TestFixtures>({

    loginPage: async ({page}, use) => {
        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },

    productsPage: async ({page}, use) => {
        const productsPage: ProductsPage = new ProductsPage(page);
        await use(productsPage);
    },

    cartPage: async ({page}, use) => {
        const cartPage: CartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutInformationPage: async ({page}, use) => {
        const checkoutInformationPage: CheckoutInformationPage = new CheckoutInformationPage(page);
        await use(checkoutInformationPage);
    },

    checkoutOverviewPage: async ({page}, use) => {
        const checkoutOverviewPage: CheckoutOverviewPage = new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    },

    checkoutCompletePage: async ({page}, use) => {
        const checkoutCompletePage: CheckoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    }
});


export { expect } from '@playwright/test';
