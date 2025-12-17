// Import Playwright test functions
const { test, expect } = require('@playwright/test');

// Test case for user login
test('Test Case 2: c', async ({ browser }) => {
  // Launch a new browser context
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 2: Navigate to the URL
  await page.goto('http://automationexercise.com');

  // Step 3: Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Step 4: Click on 'Signup / Login' button
  await page.click('text=Signup / Login');

  // Step 5: Verify 'Login to your account' is visible
  await expect(page.locator('text=Login to your account')).toBeVisible();

  // Step 6: Enter correct email address and password
  await page.fill('input[name="email"]', 'test1112226@yopmail.com'); // Use a valid email
  await page.fill('input[name="password"]', 'Password123!'); // Use the correct password

  // Step 7: Click 'login' button
  await page.click('button:has-text("Login")');

  // Step 8: Verify that 'Logged in as username' is visible
  await expect(page.locator('text=Logged in as Test')).toBeVisible();

});

// Test case for user login with incorrect credentials
test.only('Test Case 3: Login User with incorrect email and password', async ({ browser }) => {
  // Launch a new browser context
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 2: Navigate to the URL
  await page.goto('http://automationexercise.com');

  // Step 3: Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Step 4: Click on 'Signup / Login' button
  await page.click('text=Signup / Login');

  // Step 5: Verify 'Login to your account' is visible
  await expect(page.locator('text=Login to your account')).toBeVisible();

  // Step 6: Enter incorrect email address and password
  await page.fill('input[name="email"]', 'incorrect@example.com'); // Use an incorrect email
  await page.fill('input[name="password"]', 'WrongPassword'); // Use an incorrect password

  // Step 7: Click 'login' button
  await page.click('button:has-text("Login")');


  // Step 8: Verify error 'Your email or password is incorrect!' is visible
  await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible({ timeout: 120000 });

});