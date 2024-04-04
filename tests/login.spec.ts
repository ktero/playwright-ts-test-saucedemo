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

    const username = loginData.InvalidScenario.Username;
    const password = loginData.InvalidScenario.Password;
    const isValidLogin = loginData.InvalidScenario.IsValidLogin;
    
    await loginPage.performLogin(username, password, isValidLogin);
  });

});

