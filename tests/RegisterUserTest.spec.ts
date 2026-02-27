import { test, expect, Page } from '@playwright/test';

// Function to generate unique name and email
type UniqueUser = { uniqueName: string; uniqueEmail: string };

function generateUniqueUser(): UniqueUser {
  const timestamp = Date.now();
  const uniqueName = `TestUser${timestamp}`;
  const uniqueEmail = `testuser${timestamp}@example.com`;
  return { uniqueName, uniqueEmail };
}

test('Test Case 1: Register User', async ({ page }: { page: Page }) => {
  // Generate unique name and email
  const { uniqueName, uniqueEmail } = generateUniqueUser();

  await test.step('Given I am on the home page', async () => {
    await page.goto('http://automationexercise.com');
    await expect(page).toHaveTitle(/Automation Exercise/);
  });

  await test.step('When I click on Signup / Login button', async () => {
    await page.click('text=Signup / Login');
  });

  await test.step('Then New User Signup is visible', async () => {
    await expect(page.locator('text=New User Signup!')).toBeVisible();
  });

  await test.step('When I enter name and email and click Signup', async () => {
    await page.fill('input[name="name"]', uniqueName);
    await page.fill('input[name="email"]', uniqueEmail);
    await page.click('button:has-text("Signup")');
  });

  await test.step('When I fill account details', async () => {
    await page.fill('input[data-qa="signup-name"]', uniqueName);
    await page.fill('input[data-qa="signup-email"]', uniqueEmail);
    await page.click('button[data-qa="signup-button"]');
    await page.check('input[value="Mr"]');
    await page.fill('input[name="password"]', 'Password123');
    await page.selectOption('select[name="days"]', '1');
    await page.selectOption('select[name="months"]', 'January');
    await page.selectOption('select[name="years"]', '1990');
  });

  await test.step('Then Enter Account Information is visible', async () => {
    await expect(page.locator('text=ENTER ACCOUNT INFORMATION')).toBeVisible();
  });

  await test.step('And I select newsletters and offers', async () => {
    await page.check('input[name="newsletter"]');
    await page.check('input[name="optin"]');
  });

  await test.step('And I fill address details', async () => {
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
  });

  await test.step('When I click Create Account', async () => {
    await page.click('button:has-text("Create Account")');
  });

  await test.step('Then Account Created is visible', async () => {
    await expect(page.locator('text=ACCOUNT CREATED!')).toBeVisible();
  });

  await test.step('When I click Continue', async () => {
    await page.click('a[data-qa="continue-button"]');
  });

  await test.step('Then I am logged in as username', async () => {
    await expect(page.locator(`text=Logged in as ${uniqueName}`)).toBeVisible();
  });

  await test.step('When I click Delete Account', async () => {
    await page.click('a[href="/delete_account"]');
  });

  await test.step('Then Account Deleted is visible', async () => {
    await expect(page.locator('text=ACCOUNT DELETED!')).toBeVisible();
  });

  await test.step('When I click Continue again', async () => {
    await page.click('a[data-qa="continue-button"]');
  });
});
