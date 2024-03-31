import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login';
import { ProductsPage } from '../pages/products';
import { CartPage } from '../pages/cart';
import { CheckoutInformationPage } from '../pages/checkout-information';
import { CheckoutOverviewPage } from '../pages/checkout-overview';
import { CheckoutCompletePage } from '../pages/checkout-complete';

import * as loginData from '../data/login.json';
import * as testData from '../data/test.json';

test.describe(`Checkout`, () => {
  
  test('should be able to checkout multiple items', async ({ page }) => {

    const loginPage: LoginPage = new LoginPage(page);
    const productsPage: ProductsPage = new ProductsPage(page);
    const cartPage: CartPage = new CartPage(page);
    const checkoutInformationPage: CheckoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage: CheckoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage: CheckoutCompletePage = new CheckoutCompletePage(page);

    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;
    const isValidLogin: boolean = loginData.ValidScenario.IsValidLogin;

    const items: string | string[] = testData.Items;

    const firstName: string = testData.Checkout.FirstName;
    const lastName: string = testData.Checkout.LastName;
    const postalOrZipCode: string = testData.Checkout.PostalOrZipCode;

    const expectedCompleteHeader: string = testData.CheckoutCompleteMessage.Header;
    const expectedCompleteText: string = testData.CheckoutCompleteMessage.Text
  
    await loginPage.goto();
    await loginPage.performLogin(username, password, isValidLogin);

    await productsPage.performAddItemsToCart(items);
    await productsPage.navigateToCartPage();

    await cartPage.checkIfAddedItemsExist(items);
    await cartPage.navigateToCheckoutInformationPage();

    await checkoutInformationPage.performFillUpCheckoutInformation(firstName, lastName, postalOrZipCode);
    await checkoutInformationPage.navigateToCheckoutOverViewPage();

    await checkoutOverviewPage.checkIfAddedItemsExist(items);
    await checkoutOverviewPage.navigateToCheckoutCompletePage();

    await checkoutCompletePage.assertCheckoutIsComplete(expectedCompleteHeader, expectedCompleteText);
    await checkoutCompletePage.navigateToProductsPage();
  });

});

