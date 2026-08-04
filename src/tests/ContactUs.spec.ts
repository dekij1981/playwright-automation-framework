import { test } from '@fixtures/page-objects';

test.describe('Contact Us Form E2E Workflows', () => {
  test('Test Case 6: Submit Contact Us Form successfully', async ({ homePage, contactUsPage }) => {
    await test.step('Navigate to home page', async () => {
      await homePage.open();
      await homePage.expectToBeLoaded();
    });

    await test.step('Go to Contact Us page', async () => {
      await homePage.openContactUsPage();
      await contactUsPage.verifyPageLoaded();
    });

    await test.step('Fill form', async () => {
      await contactUsPage.fillForm(
        'Dejan QA',
        'dejan.test@example.com',
        'Automation Inquiry',
        'Stable CI test message',
      );
    });

    await test.step('Upload file', async () => {
      await contactUsPage.uploadFile('qa_report.txt', 'Playwright CI-safe attachment');
    });

    await test.step('Submit form', async () => {
      await contactUsPage.submitForm();
    });

    await test.step('Return home', async () => {
      await contactUsPage.clickHomeButton();
      await homePage.expectToBeLoaded();
    });
  });
});
