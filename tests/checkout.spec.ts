import { test } from '@playwright/test';

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

    // Test data below
    // Login
    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;
    const isValidLogin: boolean = loginData.ValidScenario.IsValidLogin;

    // Items to add
    const items: string | string[] = testData.Test1.ItemsToAdd;

    // Checkout Information
    const firstName: string = testData.Test1.CheckoutInformation.FirstName;
    const lastName: string = testData.Test1.CheckoutInformation.LastName;
    const postalOrZipCode: string = testData.Test1.CheckoutInformation.PostalOrZipCode;

    // Expected messages in Complete Checkout page
    const expectedCompleteHeader: string = testData.Test1.ExpectedCheckoutCompleteMessage.Header;
    const expectedCompleteText: string = testData.Test1.ExpectedCheckoutCompleteMessage.Text;
  
    await loginPage.goto();
    await loginPage.performLogin(username, password, isValidLogin);

    await productsPage.performAddItemsToCart(items);
    await productsPage.navigateToCartPage();

    await cartPage.checkIfAddedItemsExist(items);
    await cartPage.navigateToCheckoutInformationPage();

    await checkoutInformationPage.performFillUpCheckoutInformation(firstName, lastName, postalOrZipCode);
    await checkoutInformationPage.navigateToCheckoutOverViewPage();

    await checkoutOverviewPage.checkIfItemsExist(items);
    await checkoutOverviewPage.navigateToCheckoutCompletePage();

    await checkoutCompletePage.assertCheckoutIsComplete(expectedCompleteHeader, expectedCompleteText);
    await checkoutCompletePage.navigateToProductsPage();
  });

  test('should be able to remove items in shopping cart and then checkout the remaining items', async ({ page }) => {

    const loginPage: LoginPage = new LoginPage(page);
    const productsPage: ProductsPage = new ProductsPage(page);
    const cartPage: CartPage = new CartPage(page);
    const checkoutInformationPage: CheckoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage: CheckoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage: CheckoutCompletePage = new CheckoutCompletePage(page);
    
    // Test data below
    // Login
    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;
    const isValidLogin: boolean = loginData.ValidScenario.IsValidLogin;

    // Items to add
    const items: string | string[] = testData.Test2.ItemsToAdd;
    const removeItems: string | string[] = testData.Test2.ItemsToRemove;
    const remainingItems: string[] = items.filter(item => !removeItems.includes(item));

    // Checkout Information
    const firstName: string = testData.Test2.CheckoutInformation.FirstName;
    const lastName: string = testData.Test2.CheckoutInformation.LastName;
    const postalOrZipCode: string = testData.Test2.CheckoutInformation.PostalOrZipCode;

    // Expected messages in Complete Checkout page
    const expectedCompleteHeader: string = testData.Test2.ExpectedCheckoutCompleteMessage.Header;
    const expectedCompleteText: string = testData.Test2.ExpectedCheckoutCompleteMessage.Text;
  
    await loginPage.goto();
    await loginPage.performLogin(username, password, isValidLogin);

    await productsPage.performAddItemsToCart(items);
    await productsPage.navigateToCartPage();

    await cartPage.checkIfAddedItemsExist(items);
    await cartPage.removeAddedItemsInTheCart(removeItems);
    await cartPage.checkIfAddedItemsExist(remainingItems);
    await cartPage.navigateToCheckoutInformationPage();

    await checkoutInformationPage.performFillUpCheckoutInformation(firstName, lastName, postalOrZipCode);
    await checkoutInformationPage.navigateToCheckoutOverViewPage();

    await checkoutOverviewPage.checkIfItemsExist(remainingItems);
    await checkoutOverviewPage.navigateToCheckoutCompletePage();

    await checkoutCompletePage.assertCheckoutIsComplete(expectedCompleteHeader, expectedCompleteText);
    await checkoutCompletePage.navigateToProductsPage();
  });

});

