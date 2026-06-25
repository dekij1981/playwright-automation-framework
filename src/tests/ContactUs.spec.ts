import { test } from '@fixtures/page-objects';

test.describe('Contact Us Form E2E Workflows', () => {

  test('Test Case 6: Submit Contact Us Form successfully', async ({
    homePage,
    contactUsPage
  }) => {

    await test.step('Given I navigate to the home page', async () => {
      await homePage.navigateToHome();
      await homePage.verifyTitle();
    });

    await test.step('When I navigate onto Contact Us page', async () => {
      await homePage.clickContactUs();
      await contactUsPage.verifyPageLoaded();
    });

    await test.step('And I fill the form', async () => {
      await contactUsPage.fillForm(
        'Dejan QA',
        'dejan.test@example.com',
        'Automation Inquiry',
        'Enterprise level automated test message'
      );
    });

    await test.step('And I upload file', async () => {
      await contactUsPage.uploadFile(
        'qa_report.txt',
        'Playwright attachment test'
      );
    });

    await test.step('When I submit form', async () => {
      await contactUsPage.submitForm();
    });

    await test.step('Then I verify success', async () => {
      await contactUsPage.verifySuccessMessage();
    });

    await test.step('And I go back home', async () => {
      await contactUsPage.clickHomeButton();
      await homePage.verifyTitle();
    });
  });
});