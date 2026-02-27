import { test, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUsPage';

test.only('Test Case 6: Contact Us Form', async ({ page }: { page: Page }) => {
  // Give this test extra time beyond the 40s config default.
  test.setTimeout(90_000);

  const homePage = new HomePage(page);
  const contactUsPage = new ContactUsPage(page);

  await test.step("Given I am on the home page", async () => {
    await homePage.navigateToHome();
    await homePage.verifyTitle();
  });

  await test.step("When I click on Contact Us button", async () => {
    await homePage.clickContactUs();
    await contactUsPage.verifyPageLoaded();
  });

  await test.step("And I fill the contact form", async () => {
    await contactUsPage.fillForm(
      'Test User',
      'test.user@example.com',
      'Contact Form Subject',
      'This is a test message from Playwright.'
    );
  });

  await test.step("And I upload a file", async () => {
    await contactUsPage.uploadFile();
  });

  await test.step("When I submit the form", async () => {
    await contactUsPage.submitForm();
  });

  await test.step("Then I should see success message", async () => {
    await contactUsPage.verifySuccessMessage();
  });

  await test.step("When I click Home button", async () => {
    await homePage.clickHome();
  });

  await test.step("Then I should be on home page", async () => {
    await homePage.verifyTitle();
  });
});
