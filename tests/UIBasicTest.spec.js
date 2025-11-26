const { test, expect } = require('@playwright/test');

test('Browser Context Playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  
  // CHANGE: Moved the console log inside the test function
  const title = await page.title();
  console.log(title);
  
});

test('Page Playwright test', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle('Google');
});