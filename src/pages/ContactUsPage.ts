import { expect, Page, Locator } from '@playwright/test';

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

    this.contactForm = page.locator('#contact-page form');

    this.name = this.contactForm.locator('input[data-qa="name"]');
    this.email = this.contactForm.locator('input[data-qa="email"]');
    this.subject = this.contactForm.locator('input[data-qa="subject"]');
    this.message = this.contactForm.locator('textarea[data-qa="message"]');

    this.upload = this.contactForm.locator('input[name="upload_file"]');
    this.submitBtn = this.contactForm.locator('input[type="submit"]');

    this.homeBtn = page.locator('#contact-page a[href="/"]');
  }

  // -------------------------
  // NAVIGATION
  // -------------------------

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.contactForm).toBeVisible();
  }

  async clickHomeButton(): Promise<void> {
    const homeLink = this.page.locator('#contact-page a[href="/"]');

    await expect(homeLink).toBeVisible({ timeout: 10000 });
    await expect(homeLink).toBeEnabled();

    await homeLink.scrollIntoViewIfNeeded();
    await homeLink.click();

    await expect(this.page).toHaveURL('/');
  }

  // -------------------------
  // ACTIONS
  // -------------------------

  async fillForm(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.subject.fill(subject);
    await this.message.fill(message);
  }

  async uploadFile(fileName: string, content: string): Promise<void> {
    await this.upload.setInputFiles({
      name: fileName,
      mimeType: 'text/plain',
      buffer: Buffer.from(content),
    });
  }

  async submitForm(): Promise<void> {
    await expect(this.submitBtn).toBeVisible();
    await expect(this.submitBtn).toBeEnabled();

    await this.submitBtn.click();
    await expect(this.contactForm).toBeVisible();
  }
}