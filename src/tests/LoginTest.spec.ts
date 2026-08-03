import { test } from '@fixtures/page-objects';

test.describe('User Authentication Workflows', () => {
  test('Test Case 2: Login User with correct email and password', async ({
    homePage,
    signupLoginPage,
  }) => {
    // The 'homePage' and 'signupLoginPage' are automatically injected via custom fixtures

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

  test('Test Case 3: Login User with incorrect email and password', async ({
    homePage,
    signupLoginPage,
  }) => {
    // Reusing the same injected page instances for separate test evaluation

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
});
