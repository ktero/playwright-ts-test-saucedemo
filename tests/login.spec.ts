import { test, expect } from '../fixtures/test-fixture';

import * as loginData from '../data/login.json';

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

    let actualErrorMessage: string = await loginPage.getLoginErrorMessage();
    await expect(actualErrorMessage).toEqual(expectedErrorMessage);
  });

  test('should not be able to login when not inputting username or password', async ({ loginPage }) => {

    const username: string = loginData.InvalidScenario_NoInput.Username;
    const password: string = loginData.InvalidScenario_NoInput.Password;
    const isValidLogin: boolean = loginData.InvalidScenario_NoInput.IsValidLogin;
    const expectedErrorMessage: string = loginData.InvalidScenario_NoInput.ExpectedErrorMessage;
    
    await loginPage.performLogin(username, password, isValidLogin);

    let actualErrorMessage: string = await loginPage.getLoginErrorMessage();
    await expect(actualErrorMessage).toEqual(expectedErrorMessage);
  });

  test('should not be able to login when username is not entered', async ({ loginPage }) => {

    const username: string = loginData.InvalidScenario_NoUsername.Username;
    const password: string = loginData.InvalidScenario_NoUsername.Password;
    const isValidLogin: boolean = loginData.InvalidScenario_NoUsername.IsValidLogin;
    const expectedErrorMessage: string = loginData.InvalidScenario_NoUsername.ExpectedErrorMessage;
    
    await loginPage.performLogin(username, password, isValidLogin);

    let actualErrorMessage: string = await loginPage.getLoginErrorMessage();
    await expect(actualErrorMessage).toEqual(expectedErrorMessage);
  });

  test('should not be able to login when password is not entered', async ({ loginPage }) => {

    const username: string = loginData.InvalidScenario_NoPassword.Username;
    const password: string = loginData.InvalidScenario_NoPassword.Password;
    const isValidLogin: boolean = loginData.InvalidScenario_NoPassword.IsValidLogin;
    const expectedErrorMessage: string = loginData.InvalidScenario_NoPassword.ExpectedErrorMessage;
    
    await loginPage.performLogin(username, password, isValidLogin);

    let actualErrorMessage: string = await loginPage.getLoginErrorMessage();
    await expect(actualErrorMessage).toEqual(expectedErrorMessage);
  });

  test('should not be able to login if user is locked', async ({ loginPage }) => {

    const username: string = loginData.InvalidScenario_LockedOutUser.Username;
    const password: string = loginData.InvalidScenario_LockedOutUser.Password;
    const isValidLogin: boolean = loginData.InvalidScenario_LockedOutUser.IsValidLogin;
    const expectedErrorMessage: string = loginData.InvalidScenario_LockedOutUser.ExpectedErrorMessage;
    
    await loginPage.performLogin(username, password, isValidLogin);

    let actualErrorMessage: string = await loginPage.getLoginErrorMessage();
    await expect(actualErrorMessage).toEqual(expectedErrorMessage);
  });

});

