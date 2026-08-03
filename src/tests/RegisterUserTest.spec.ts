import { test } from '@fixtures/page-objects';

type UniqueUser = { uniqueName: string; uniqueEmail: string };

function generateUniqueUser(): UniqueUser {
  const timestamp = Date.now();
  const uniqueName = `TestUser${timestamp}`;
  const uniqueEmail = `testuser${timestamp}@example.com`;
  return { uniqueName, uniqueEmail };
}

test.describe('User Registration Workflows', () => {
  test('Test Case 1: Register User successfully', async ({
    homePage,
    signupLoginPage,
    accountInfoPage,
  }) => {
    const { uniqueName, uniqueEmail } = generateUniqueUser();

    await test.step('Given I am on the home page', async () => {
      await homePage.navigateToHome();
      await homePage.verifyTitle();
    });

    await test.step('When I click on Signup / Login button', async () => {
      await homePage.clickSignupLogin();
    });

    await test.step('Then New User Signup is visible', async () => {
      await signupLoginPage.verifySignupSection();
    });

    await test.step('When I enter name and email and click Signup', async () => {
      await signupLoginPage.startSignup(uniqueName, uniqueEmail);
    });

    await test.step('Then Enter Account Information is visible', async () => {
      await accountInfoPage.verifyAccountInfoPage();
    });

    await test.step('When I fill account details', async () => {
      await accountInfoPage.fillAccountDetails('Password123!');
    });

    await test.step('And I fill address details', async () => {
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

    await test.step('When I click Create Account', async () => {
      await accountInfoPage.createAccount();
    });

    await test.step('Then Account Created is visible', async () => {
      await accountInfoPage.verifyAccountCreated();
    });

    await test.step('When I click Continue', async () => {
      await accountInfoPage.clickContinue();
    });

    await test.step('Then I am logged in as username', async () => {
      await signupLoginPage.verifyLoggedIn(uniqueName);
    });

    await test.step('When I click Delete Account', async () => {
      await accountInfoPage.deleteAccount();
    });

    await test.step('Then Account Deleted is visible', async () => {
      await accountInfoPage.verifyAccountDeleted();
    });

    await test.step('When I click Continue again', async () => {
      await accountInfoPage.clickContinue();
    });
  });
});
