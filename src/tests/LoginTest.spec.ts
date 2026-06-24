import { test } from '@playwright/test';
import {HomePage} from '../src/pages/HomePage';
import {SignupLoginPage} from '../src/pages/SignupLoginPage';
// Test case for user login

test('Test Case 2: Login User with correct email and password', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  await test.step('Given I am on the home page', async () => {
    await homePage.navigateToHome();
    await homePage.verifyTitle();
  });

  await test.step('When I click on Signup / Login button', async () => {
    await homePage.clickSignupLogin();
  });

  await test.step('Then the login section is visible', async () => {
    await signupLoginPage.verifyLoginSection();
  });

  await test.step('When I enter correct email and password and login', async () => {
    await signupLoginPage.login('test1112226@yopmail.com', 'Password123!');
  });

  await test.step('Then I should be logged in as username', async () => {
    await signupLoginPage.verifyLoggedIn('Test');
  });
});

// Test case for user login with incorrect credentials

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  await test.step('Given I am on the home page', async () => {
    await homePage.navigateToHome();
    await homePage.verifyTitle();
  });

  await test.step('When I click on Signup / Login button', async () => {
    await homePage.clickSignupLogin();
  });

  await test.step('Then the login section is visible', async () => {
    await signupLoginPage.verifyLoginSection();
  });

  await test.step('When I enter incorrect email and password and login', async () => {
    await signupLoginPage.login('incorrect@example.com', 'WrongPassword');
  });

  await test.step('Then I should see login error message', async () => {
    await signupLoginPage.verifyLoginError();
  });
});
