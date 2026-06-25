import { expect, Page, Locator, Dialog } from '@playwright/test';

/**
 * Page Object Model representing the Contact Us page.
 * Handles selectors and actions required for testing the feedback form pipelines.
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

    // Root container for the contact submission form layout
    this.contactForm = page.locator('#contact-page form');

    // Input form field controls mapped via QA data attributes and standard names
    this.name = this.contactForm.locator('input[data-qa="name"]');
    this.email = this.contactForm.locator('input[data-qa="email"]');
    this.subject = this.contactForm.locator('input[data-qa="subject"]');
    this.message = this.contactForm.locator('textarea[data-qa="message"]');

    // File attachment upload interaction node
    this.upload = this.contactForm.locator('input[name="upload_file"]');

    // Action triggers defined strictly using case-insensitive accessible roles
    this.submitBtn = this.contactForm.getByRole('button', { name: /^submit$/i });
    this.homeBtn = page.locator('#contact-page').getByRole('link', { name: /^home$/i });
  }

  /**
   * Verifies that the Contact Us context endpoint view layer has successfully initialized.
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.contactForm).toBeVisible();
  }

  /**
   * Fills all target text fields with structural information data records.
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

    // Assert that target fields match input sequences before executing action triggers
    await expect(this.name).toHaveValue(name);
    await expect(this.email).toHaveValue(email);
    await expect(this.subject).toHaveValue(subject);
    await expect(this.message).toHaveValue(message);
  }

  /**
   * Appends virtual file payloads directly into the DOM context file stream buffer.
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
   * Submits the contact data payload sequence.
   * Utilizes Promise.all to safely intercept browser dialog popups and eliminate race conditions.
   */
  async submitForm(): Promise<void> {
    await expect(this.submitBtn).toBeEnabled();

    // Synchronously listen for the browser dialog while initiating the form submit click action
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.submitBtn.click(),
    ]);

    // Handle and confirm the native alert modal to finish transaction lifecycle steps
    await dialog.accept();
  }

  /**
   * Validates database reception endpoints by checking UI success banners.
   */
  async verifySuccessMessage(): Promise<void> {
    const successMsg = this.page
      .locator('.alert-success')
      .filter({ hasText: /success.*submitted/i });

    await expect(successMsg.first()).toBeVisible({ timeout: 20_000 });
  }

  /**
   * Dispatches navigation click behaviors to route users back to primary dashboards.
   */
  async clickHomeButton(): Promise<void> {
    await expect(this.homeBtn).toBeVisible();
    await this.homeBtn.click();
  }
}