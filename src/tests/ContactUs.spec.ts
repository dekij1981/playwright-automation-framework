import { test } from '@fixtures/page-objects.ts';
import { expect, Page, Locator } from '@playwright/test';


/**
 * Page Object Model representing the Contact Us page components and actions.
 */
export class ContactUsPage {
  readonly page: Page;
  readonly contactForm: Locator;

  readonly name: Locator;
  readonly email: Locator;
  readonly subject: Locator;
  readonly message: Locator;
  readonly upload: Locator;

  readonly submitBtn: Locator;
  readonly homeBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Root container for the contact form elements
    this.contactForm = page.locator('#contact-page form');

    // Data-qa and attribute driven locator definitions
    this.name = this.contactForm.locator('input[data-qa="name"]');
    this.email = this.contactForm.locator('input[data-qa="email"]');
    this.subject = this.contactForm.locator('input[data-qa="subject"]');
    this.message = this.contactForm.locator('textarea[data-qa="message"]');
    this.upload = this.contactForm.locator('input[name="upload_file"]');

    // Interactive button and link action locators
    this.submitBtn = this.contactForm.getByRole('button', { name: /^submit$/i });
    this.homeBtn = page.locator('#contact-page').getByRole('link', { name: /^home$/i });
  }

  /**
   * Asserts that the page URL and the main contact form container are loaded correctly.
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.contactForm).toBeVisible();
  }

  /**
   * Fills all primary input fields inside the contact form and validates their state.
   */
  async fillForm(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    await expect(this.contactForm).toBeVisible();

    await this.name.fill(name);
    await this.email.fill(email);
    await this.subject.fill(subject);
    await this.message.fill(message);

    // Dynamic verification assertions to guarantee data entry before submission
    await expect(this.name).toHaveValue(name);
    await expect(this.email).toHaveValue(email);
    await expect(this.subject).toHaveValue(subject);
    await expect(this.message).toHaveValue(message);
  }

  /**
   * Injects a buffer-driven runtime attachment directly into the file input element.
   */
  async uploadFile(
    fileName = 'contact.txt',
    content = 'Attachment from Playwright Contact Us test.'
  ): Promise<void> {
    await this.upload.setInputFiles({
      name: fileName,
      mimeType: 'text/plain',
      buffer: Buffer.from(content),
    });
  }

  /**
   * Handles the browser alert/confirm popup synchronously during submission.
   */
  async submitForm(): Promise<void> {
    await expect(this.submitBtn).toBeEnabled();

    // Set up a listener for the native browser dialog trigger
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.submitBtn.click();

    // Await the dialog catch and automatically accept it
    const dialog = await dialogPromise;
    await dialog.accept();
  }

  /**
   * Asserts the presence of a success confirmation message upon form processing.
   */
  async verifySuccessMessage(): Promise<void> {
    const successMsg = this.page
      .locator('.alert-success')
      .filter({ hasText: /success.*submitted/i });

    await expect(successMsg.first()).toBeVisible({ timeout: 20_000 });
  }

  /**
   * Routes the browser context back to the home view via the page control button.
   */
  async clickHomeButton(): Promise<void> {
    await expect(this.homeBtn).toBeVisible();
    await this.homeBtn.click();
  }
}