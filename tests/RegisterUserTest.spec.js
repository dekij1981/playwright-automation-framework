// Import Playwright test functions
const { test, expect } = require('@playwright/test');

// Function to generate unique name and email
function generateUniqueUser() {
  const timestamp = Date.now();
  const uniqueName = `TestUser${timestamp}`;
  const uniqueEmail = `testuser${timestamp}@example.com`;
  return { uniqueName, uniqueEmail };
}

// Test case for user registration
test('Test Case 1: Register User', async ({ browser }) => {
  // Launch a new browser context
  const context = await browser.newContext();
  const page = await context.newPage();

  // Generate unique name and email
  const { uniqueName, uniqueEmail } = generateUniqueUser();

  // Step 2: Navigate to the URL
  await page.goto('http://automationexercise.com');

  // Step 3: Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Step 4: Click on 'Signup / Login' button
  await page.click('text=Signup / Login');

  // Step 5: Verify 'New User Signup!' is visible
  await expect(page.locator('text=New User Signup!')).toBeVisible();

  // Step 6: Enter name and email address
  await page.fill('input[name="name"]', uniqueName);
  await page.fill('input[name="email"]', uniqueEmail);

  // Step 7: Click 'Signup' button
  await page.click('button:has-text("Signup")');

  // Step 8: Enter Name into the name field
  await page.fill('input[data-qa="signup-name"]', uniqueName);

  // Step 9: Enter Email into the email field
  await page.fill('input[data-qa="signup-email"]', uniqueEmail);

  // Step 10: Click on the signup button
  await page.click('button[data-qa="signup-button"]');

  // Step 11: Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.locator('text=ENTER ACCOUNT INFORMATION')).toBeVisible();

  // Step 12: Fill details: Title, Name, Email, Password, Date of birth
  await page.check('input[value="Mr"]'); // Assuming 'Mr' is a radio button value
  await page.fill('input[name="password"]', 'Password123');
  await page.selectOption('select[name="days"]', '1');
  await page.selectOption('select[name="months"]', 'January');
  await page.selectOption('select[name="years"]', '1990');

  // Step 13: Select checkbox 'Sign up for our newsletter!'
  await page.check('input[name="newsletter"]');

  // Step 14: Select checkbox 'Receive special offers from our partners!'
  await page.check('input[name="optin"]');

  // Step 15: Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await page.fill('input[name="first_name"]', 'Test');
  await page.fill('input[name="last_name"]', 'User');
  await page.fill('input[name="company"]', 'Test Company');
  await page.fill('input[name="address1"]', '123 Test St');
  await page.fill('input[name="address2"]', 'Suite 100');
  await page.selectOption('select[name="country"]', 'United States');
  await page.fill('input[name="state"]', 'Test State');
  await page.fill('input[name="city"]', 'Test City');
  await page.fill('input[name="zipcode"]', '12345');
  await page.fill('input[name="mobile_number"]', '1234567890');

  // Step 16: Click 'Create Account' button
  await page.click('button:has-text("Create Account")');

  // Step 17: Verify that 'ACCOUNT CREATED!' is visible
  await expect(page.locator('text=ACCOUNT CREATED!')).toBeVisible();

  // Step 18: Click 'Continue' button using
  await page.click('a[data-qa="continue-button"]');

  // Step 19: Verify that 'Logged in as username' is visible using the unique name
  await expect(page.locator(`text=Logged in as ${uniqueName}`)).toBeVisible();

  // Step 20: Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // Step 21: Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await expect(page.locator('text=ACCOUNT DELETED!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');

  // Close the browser context
  await context.close();
});