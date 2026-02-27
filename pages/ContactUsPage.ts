import { expect, Page, Locator, BrowserContext, Dialog } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;
  readonly contactForm: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly subject: Locator;
  readonly message: Locator;
  readonly upload: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactForm = this.page.locator('#contact-page form');
    this.name = this.contactForm.locator('input[data-qa="name"]');
    this.email = this.contactForm.locator('input[data-qa="email"]');
    this.subject = this.contactForm.locator('input[data-qa="subject"]');
    this.message = this.contactForm.locator('textarea[data-qa="message"]');
    this.upload = this.contactForm.locator('input[name="upload_file"]');
    this.submitBtn = this.contactForm.getByRole('button', { name: /^submit$/i });
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.contactForm).toBeVisible();
  }

  async fillForm(name: string, email: string, subject: string, message: string): Promise<void> {
    await expect(this.name).toBeEditable();
    await expect(this.email).toBeEditable();
    await expect(this.subject).toBeEditable();
    await expect(this.message).toBeEditable();

    await this.name.click();
    await this.name.type(name);
    await this.email.click();
    await this.email.type(email);
    await this.subject.click();
    await this.subject.type(subject);
    await this.message.click();
    await this.message.type(message);

    await expect(this.name).toHaveValue(name);
    await expect(this.email).toHaveValue(email);
    await expect(this.subject).toHaveValue(subject);
    await expect(this.message).toHaveValue(message);
  }

  async uploadFile(): Promise<void> {
    await this.upload.setInputFiles({
      name: 'contact.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Attachment from Playwright Contact Us test.')
    });
  }

  async submitForm(): Promise<void> {
    await this.submitBtn.scrollIntoViewIfNeeded();
    await expect(this.submitBtn).toBeEnabled();

    // Handle the confirmation dialog that appears on submit
    await Promise.all([
      this.page.waitForEvent('dialog').then((dialog: Dialog) => dialog.accept()),
      this.submitBtn.click(),
    ]);
  }

  async verifySuccessMessage(): Promise<void> {
    const successMsg = this.page
      .locator('.status.alert.alert-success, #success-subscribe .alert-success')
      .filter({ hasText: 'Success! Your details have been submitted successfully.' })
      .first();
    await expect(successMsg).toBeVisible({ timeout: 20_000 });
  }
}
