import { createRegistrationUser } from '@data/registration';
import { test } from '@fixtures/page-objects';

test.describe('User Registration Workflows', () => {
  test('registers a new user successfully', async ({
    homePage,
    signupLoginPage,
    accountInfoPage,
  }) => {
    const user = createRegistrationUser();

    await test.step('Given I am on the home page', async () => {
      await homePage.open();
      await homePage.expectToBeLoaded();
    });

    await test.step('When I open the Signup / Login page', async () => {
      await homePage.openSignupLoginPage();
    });

    await test.step('Then the New User Signup section is visible', async () => {
      await signupLoginPage.verifySignupSection();
    });

    await test.step('When I enter a unique name and email and start signup', async () => {
      await signupLoginPage.startSignup(user.name, user.email);
    });

    await test.step('Then the account information form is visible', async () => {
      await accountInfoPage.verifyAccountInfoPage();
    });

    await test.step('When I fill in the account details', async () => {
      await accountInfoPage.fillAccountDetails(user);
    });

    await test.step('And I fill in the address details', async () => {
      await accountInfoPage.fillAddressDetails(user);
    });

    await test.step('When I create the account', async () => {
      await accountInfoPage.createAccount();
    });

    await test.step('Then the account should be created successfully', async () => {
      await accountInfoPage.verifyAccountCreated();
    });

    await test.step('When I continue to the application', async () => {
      await accountInfoPage.clickContinue();
    });

    await test.step('Then I should be logged in as the newly created user', async () => {
      await signupLoginPage.verifyLoggedIn(user.name);
    });

    await test.step('When I delete the account', async () => {
      await accountInfoPage.deleteAccount();
    });

    await test.step('Then the account should be deleted successfully', async () => {
      await accountInfoPage.verifyAccountDeleted();
    });

    await test.step('When I continue after account deletion', async () => {
      await accountInfoPage.clickContinue();
    });
  });
});
