// Import Playwright test functions
const { test, expect } = require('@playwright/test');

test.only('Test Case 6: Contact Us Form', async ({ browser }) => {
  // CHANGE: Give this test more time than the 40s default from config to avoid premature timeout.
  test.setTimeout(90_000);

  // Step 1: Launch browser (context + page)
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 2: Navigate to url
  await page.goto('http://automationexercise.com');

  // Step 3: Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Step 4: Click on 'Contact Us' button and ensure contact page is loaded
  await page.click('a[href="/contact_us"]');
  await expect(page).toHaveURL(/\/contact_us/);

  // Scope actions to the Contact Us form
  const contactForm = page.locator('#contact-page form');
  await expect(contactForm).toBeVisible();

  // Field locators scoped to the form
  const name = contactForm.locator('input[data-qa="name"]');
  const email = contactForm.locator('input[data-qa="email"]');
  const subject = contactForm.locator('input[data-qa="subject"]');
  const message = contactForm.locator('textarea[data-qa="message"]');
  const upload = contactForm.locator('input[name="upload_file"]');
  const submitBtn = contactForm.getByRole('button', { name: /^submit$/i });

  // Ensure fields are interactable before filling
  await expect(name).toBeEditable();
  await expect(email).toBeEditable();
  await expect(subject).toBeEditable();
  await expect(message).toBeEditable();

  // Step 6: Enter name, email, subject and message
  await name.fill('Test User');
  await email.fill('test.user@example.com');
  await subject.fill('Contact Form Subject');
  await message.fill('This is a test message from Playwright.');

  // CHANGE: Verify values actually landed before submitting (prevents intermittent empty submissions)
  await expect(name).toHaveValue('Test User');
  await expect(email).toHaveValue('test.user@example.com');
  await expect(subject).toHaveValue('Contact Form Subject');
  await expect(message).toHaveValue('This is a test message from Playwright.');

  // Step 7: Upload file
  await upload.setInputFiles({
    name: 'contact.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Attachment from Playwright Contact Us test.')
  });

  // Step 8 & 9: Submit and accept confirm dialog atomically to avoid races
  await Promise.all([
    page.waitForEvent('dialog').then(d => d.accept()),
    submitBtn.click(),
  ]);

  // Step 10: Verify success message is visible
  // CHANGE: Use a robust locator; prefer the contact section, but allow the alternate banner if present.
  const successMsg = page
    .locator('.status.alert.alert-success, #success-subscribe .alert-success')
    .filter({ hasText: 'Success! Your details have been submitted successfully.' })
    .first();

  await expect(successMsg).toBeVisible({ timeout: 20_000 });

  // Step 11: Click 'Home' button and verify landing on home page
  await page.click('a[href="/"]');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Close context
  await context.close();
});