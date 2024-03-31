import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import * as loginData from '../data/login.json';


test.describe(`Login`, () => {
  
  test('should be able to login when inputting valid credentials', async ({ page }) => {

    const loginPage: LoginPage = new LoginPage(page);

    const username: string = loginData.ValidScenario.Username;
    const password: string = loginData.ValidScenario.Password;
    const isValidLogin: boolean = loginData.ValidScenario.IsValidLogin;
  
    await loginPage.goto();
    await loginPage.performLogin(username, password, isValidLogin);
  });

  test('should not be able to login when inputting invalid credentials', async ({ page }) => {

    const loginPage: LoginPage = new LoginPage(page);

    const username = loginData.InvalidScenario.Username;
    const password = loginData.InvalidScenario.Password;
    const isValidLogin = loginData.InvalidScenario.IsValidLogin;
  
    await loginPage.goto();
    await loginPage.performLogin(username, password, isValidLogin);
  });

});

