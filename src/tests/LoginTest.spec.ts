import { invalidUser, validUser } from '@data/users';
import { test } from '@fixtures/page-objects';

test.describe('User Authentication Workflows', () => {
  test('logs in with correct credentials', async ({ homePage, signupLoginPage }) => {
    await test.step('Given I am on the home page', async () => {
      await homePage.open();
      await homePage.expectToBeLoaded();
    });

    await test.step('When I open the Signup / Login page', async () => {
      await homePage.openSignupLoginPage();
    });

    await test.step('Then the login section is visible', async () => {
      await signupLoginPage.verifyLoginSection();
    });

    await test.step('When I enter correct credentials and log in', async () => {
      await signupLoginPage.login(validUser.email, validUser.password);
    });

    await test.step('Then I should be logged in as the expected user', async () => {
      await signupLoginPage.verifyLoggedIn(validUser.username);
    });
  });

  test('shows an error for invalid credentials', async ({ homePage, signupLoginPage }) => {
    await test.step('Given I am on the home page', async () => {
      await homePage.open();
      await homePage.expectToBeLoaded();
    });

    await test.step('When I open the Signup / Login page', async () => {
      await homePage.openSignupLoginPage();
    });

    await test.step('Then the login section is visible', async () => {
      await signupLoginPage.verifyLoginSection();
    });

    await test.step('When I enter incorrect credentials and attempt to log in', async () => {
      await signupLoginPage.login(invalidUser.email, invalidUser.password);
    });

    await test.step('Then I should see the login error message', async () => {
      await signupLoginPage.verifyLoginError();
    });
  });
});
