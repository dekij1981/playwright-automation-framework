import { test } from '@fixtures/page-objects';

test.describe('Contact Us Form E2E Workflows', () => {

  test('Test Case 6: Submit Contact Us Form successfully', async ({ homePage, contactUsPage }) => {

    await test.step('Given I navigate to the home page', async () => {
      await homePage.navigateToHome();
      await homePage.verifyTitle();
    });

    await test.step('When I navigate onto the Contact Us layout page', async () => {
      await homePage.clickContactUs();
      await contactUsPage.verifyPageLoaded();
    });

    await test.step('And I populate the contact information fields', async () => {
      await contactUsPage.fillForm(
        'Dejan QA',
        'dejan.test@example.com',
        'Automation Inquiry',
        'This is an enterprise level automated form testing message sequence.'
      );
    });

    await test.step('And I append a text attachment to the form payload', async () => {
      await contactUsPage.uploadFile(
        'qa_report.txt',
        'Verified by automated Playwright runner process.'
      );
    });

    await test.step('When I submit the form and confirm alert', async () => {
      await contactUsPage.submitForm();
    });

    await test.step('Then I verify successful submission', async () => {
      await contactUsPage.waitForSubmissionState(); // 🔥 ključ
      await contactUsPage.verifySuccessMessage();
    });

    await test.step('And I navigate back to home page', async () => {
      await contactUsPage.clickHomeButton();
      await contactUsPage.page.waitForLoadState('domcontentloaded'); // 🔥 stabilizacija
      await homePage.verifyTitle();
    });
  });
});