import { test } from '@fixtures/page-objects';

type UniqueUser = {
  uniqueName: string;
  uniqueEmail: string;
};

function generateUniqueUser(): UniqueUser {
  const timestamp = Date.now();

  return {
    uniqueName: `TestUser${timestamp}`,
    uniqueEmail: `testuser${timestamp}@example.com`,
  };
}

test.describe('User Registration Workflows', () => {
  test('Test Case 1: Register User successfully', async ({
    homePage,
    signupLoginPage,
    accountInfoPage,
  }) => {
    const { uniqueName, uniqueEmail } = generateUniqueUser();

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
      await signupLoginPage.startSignup(uniqueName, uniqueEmail);
    });

    await test.step('Then the account information form is visible', async () => {
      await accountInfoPage.verifyAccountInfoPage();
    });

    await test.step('When I fill in the account details', async () => {
      await accountInfoPage.fillAccountDetails('Password123!');
    });

    await test.step('And I fill in the address details', async () => {
      await accountInfoPage.fillAddressDetails(
        'Test',
        'User',
        'Test Company',
        '123 Test St',
        'Suite 100',
        'United States',
        'Test State',
        'Test City',
        '12345',
        '1234567890',
      );
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
      await signupLoginPage.verifyLoggedIn(uniqueName);
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
