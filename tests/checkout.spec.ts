import { test } from '../fixtures/test-fixture';

import * as loginData from '../data/login.json';
import * as testData from '../data/test.json';

test.describe(`Checkout`, () => {
  
  test('should be able to checkout multiple items', async ({ loginPage, productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {

    // Test data below
    // Login
    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;

    // Items to add
    const items: string | string[] = testData.Test1.ItemsToAdd;

    // Checkout Information
    const firstName: string = testData.Test1.CheckoutInformation.FirstName;
    const lastName: string = testData.Test1.CheckoutInformation.LastName;
    const postalOrZipCode: string = testData.Test1.CheckoutInformation.PostalOrZipCode;

    // Expected messages in Complete Checkout page
    const expectedCompleteHeader: string = testData.Test1.ExpectedCheckoutCompleteMessage.Header;
    const expectedCompleteText: string = testData.Test1.ExpectedCheckoutCompleteMessage.Text;
  
    // await loginPage.goto();
    await loginPage.performLogin(username, password);

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

  test('should be able to remove items in shopping cart and then checkout the remaining items', async ({ loginPage, productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
    
    // Test data below
    // Login
    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;

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
    await loginPage.performLogin(username, password);

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

  test('should be able to checkout item if added from item page', async ({ loginPage, productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
    
    // Test data below
    // Login
    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;

    // Items to add
    const items: string | string[] = testData.Test3.ItemsToAdd;

    // Checkout Information
    const firstName: string = testData.Test3.CheckoutInformation.FirstName;
    const lastName: string = testData.Test3.CheckoutInformation.LastName;
    const postalOrZipCode: string = testData.Test3.CheckoutInformation.PostalOrZipCode;

    // Expected messages in Complete Checkout page
    const expectedCompleteHeader: string = testData.Test3.ExpectedCheckoutCompleteMessage.Header;
    const expectedCompleteText: string = testData.Test3.ExpectedCheckoutCompleteMessage.Text;

    await loginPage.goto();
    await loginPage.performLogin(username, password);

    await productsPage.performAddItemsToCart(items, true);
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

  test('should not be able to checkout if checkout information is not given', async ({ loginPage, productsPage, cartPage, checkoutInformationPage}) => {

    // Test data below
    // Login
    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;

    // Items to add
    const items: string | string[] = testData.Test1.ItemsToAdd;

    // Checkout Information
    const firstName: string = testData.Test1.CheckoutInformation.FirstName;
    const lastName: string = testData.Test1.CheckoutInformation.LastName;
    const postalOrZipCode: string = testData.Test1.CheckoutInformation.PostalOrZipCode;

    // Expected checkout information error messages
    const noFill: string = testData.Test4.ExpectedCheckoutInformationErrorMessages.NoFill;
    const noFirstName: string = testData.Test4.ExpectedCheckoutInformationErrorMessages.NoFirstName;
    const noLastName: string = testData.Test4.ExpectedCheckoutInformationErrorMessages.NoLastName;
    const noPostalOrZipCode: string = testData.Test4.ExpectedCheckoutInformationErrorMessages.NoPostalOrZipCode;
  
    await loginPage.goto();
    await loginPage.performLogin(username, password);

    await productsPage.performAddItemsToCart(items);
    await productsPage.navigateToCartPage();

    await cartPage.checkIfAddedItemsExist(items);
    await cartPage.navigateToCheckoutInformationPage();

    // Test when nothing is entered
    await checkoutInformationPage.performFillUpCheckoutInformation("", "", "");
    await checkoutInformationPage.navigateToCheckoutOverViewPage(false);
    await checkoutInformationPage.assertErrorMessage(noFill);
    // Test when first name is not entered
    await checkoutInformationPage.performFillUpCheckoutInformation("", lastName, postalOrZipCode);
    await checkoutInformationPage.navigateToCheckoutOverViewPage(false);
    await checkoutInformationPage.assertErrorMessage(noFirstName);
    // Test when last name is not entered
    await checkoutInformationPage.performFillUpCheckoutInformation(firstName, "", postalOrZipCode);
    await checkoutInformationPage.navigateToCheckoutOverViewPage(false);
    await checkoutInformationPage.assertErrorMessage(noLastName);
    // Test when postal or zip code is not entered
    await checkoutInformationPage.performFillUpCheckoutInformation(firstName, lastName, "");
    await checkoutInformationPage.navigateToCheckoutOverViewPage(false);
    await checkoutInformationPage.assertErrorMessage(noPostalOrZipCode);
  });

  test('should be able to navigate to About page', async ({ loginPage, productsPage }) => {

    // Test data below
    // Login
    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;
  
    await loginPage.goto();
    await loginPage.performLogin(username, password);

    // Navigate to About page
    await productsPage.navigateToAboutPage();
  });

  test('should be able to logout', async ({ loginPage, productsPage }) => {

    // Test data below
    // Login
    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;
  
    await loginPage.goto();
    await loginPage.performLogin(username, password);

    // Logout from the application
    await productsPage.performLogout();
  });

});

