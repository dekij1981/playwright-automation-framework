import { test } from '@fixtures/page-objects';

test.describe('Contact Us Form E2E Workflows', () => {

  test('Test Case 6: Submit Contact Us Form successfully', async ({ homePage, contactUsPage }) => {
    
    await test.step('Given I navigate to the home page', async () => {
      await homePage.navigateToHome();
      await homePage.verifyTitle();
    });

    await test.step('When I navigate onto the Contact Us layout page', async () => {
      // Assuming clickSignupLogin or similar logic triggers navigation or directly routing via link
      await homePage.clickSignupLogin(); 
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
      await contactUsPage.uploadFile('qa_report.txt', 'Verified by automated Playwright runner process.');
    });

    await test.step('When I click the submit trigger button and confirm the alert', async () => {
      await contactUsPage.submitForm();
    });

    await test.step('Then I should verify that the form successfully processed submission', async () => {
      await contactUsPage.verifySuccessMessage();
    });

    await test.step('And I safely route back to the landing dashboard viewport area', async () => {
      await contactUsPage.clickHomeButton();
      await homePage.verifyTitle();
    });
  });
});