import { test } from '../fixtures/test-fixture';

import * as loginData from '../data/login.json';

// should be able to remove items in shopping cart and then checkout the remaining items

test.describe(`Login`, () => {
  
  test('should be able to login when inputting valid credentials', async ({ loginPage }) => {

    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;
    const isValidLogin: boolean = loginData.ValidScenario.IsValidLogin;

    await loginPage.performLogin(username, password, isValidLogin);
  });

  test('should not be able to login when inputting invalid credentials', async ({ loginPage }) => {

    const username: string = loginData.InvalidScenario.Username;
    const password: string = loginData.InvalidScenario.Password;
    const isValidLogin: boolean = loginData.InvalidScenario.IsValidLogin;
    const expectedErrorMessage: string = loginData.InvalidScenario.ExpectedErrorMessage;
    
    await loginPage.performLogin(username, password, isValidLogin);
    await loginPage.assertLoginErrorMessage(expectedErrorMessage);
  });

  test('should not be able to login when not inputting username or password', async ({ loginPage }) => {

    const username: string = loginData.InvalidScenario_NoInput.Username;
    const password: string = loginData.InvalidScenario_NoInput.Password;
    const isValidLogin: boolean = loginData.InvalidScenario_NoInput.IsValidLogin;
    const expectedErrorMessage: string = loginData.InvalidScenario_NoInput.ExpectedErrorMessage;
    
    await loginPage.performLogin(username, password, isValidLogin);
    await loginPage.assertLoginErrorMessage(expectedErrorMessage);
  });

});

