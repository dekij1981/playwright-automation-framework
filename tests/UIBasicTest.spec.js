const { test, expect } = require('@playwright/test');

test('Browser Context Playwright test', async ({ page }) => {
  await test.step("When I navigate to the login page", async () => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  });

  await test.step("Then I log the page title", async () => {
    const title = await page.title();
    console.log(title);
  });
});

test('Page Playwright test', async ({ page }) => {
  await test.step("When I navigate to Google", async () => {
    await page.goto('https://google.com');
  });

  await test.step("Then the title should be Google", async () => {
    await expect(page).toHaveTitle('Google');
  });
});