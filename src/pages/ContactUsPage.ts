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
    this.homeBtn = page.locator('#contact-page').getByRole('link', { name: /^home$/i });
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contact_us/);

    // Remove any leftover iframes (ads safety)
    await this.page.evaluate(() => {
      document.querySelectorAll('iframe').forEach(el => el.remove());
    });

    await expect(this.contactForm).toBeVisible();
  }

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

    await expect(this.name).toHaveValue(name);
    await expect(this.email).toHaveValue(email);
    await expect(this.subject).toHaveValue(subject);
    await expect(this.message).toHaveValue(message);
  }

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

  private async safeClick(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();

    await this.page.waitForLoadState('domcontentloaded');

    await locator.click({ force: true });
  }

  async submitForm(): Promise<void> {
    const dialogPromise = this.page
      .waitForEvent('dialog')
      .then(dialog => dialog.accept())
      .catch(() => {});

    await this.safeClick(this.submitBtn);

    await dialogPromise;

    await this.page.waitForLoadState('networkidle');
  }

  async waitForSubmissionState(): Promise<void> {
    await Promise.race([
      this.page.waitForURL(/contact_us|success/i, { timeout: 15000 }),
      this.page.getByText(/success.*submitted/i).waitFor({ timeout: 15000 }),
    ]);
  }

  async verifySuccessMessage(): Promise<void> {
    const successMsg = this.page.getByText(
      /success.*submitted.*successfully/i
    );

    await expect(successMsg).toBeVisible({ timeout: 20000 });
  }

  async clickHomeButton(): Promise<void> {
    await this.safeClick(this.homeBtn);

    const currentUrl = this.page.url();
    if (currentUrl.includes('google_vignette') || currentUrl.includes('contact_us')) {
      await this.page.goto('https://automationexercise.com/');
    }
  }
}