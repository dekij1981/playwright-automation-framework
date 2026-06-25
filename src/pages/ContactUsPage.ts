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
  // NAV
  // -------------------------

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.contactForm).toBeVisible();
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

  // -------------------------
  // STABLE SUBMIT (IMPORTANT FIX)
  // -------------------------

  async submitForm(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');

    await this.submitBtn.click();

    const dialog = await dialogPromise;

    // strict validation (prevents silent failure)
    await expect(dialog.message().toLowerCase()).toContain('success');

    await dialog.accept();

    // 🔥 HARD SYNC POINT (CI STABILITY CRITICAL)
    await this.page.waitForLoadState('domcontentloaded');

    // ensure form still exists OR page didn't break
    await expect(this.contactForm).toBeVisible();
  }

  async clickHomeButton(): Promise<void> {
    await this.homeBtn.click();
    await expect(this.page).toHaveURL('/');
  }
}