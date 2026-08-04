import { expect, Locator, Page } from '@playwright/test';

export class ContactUsPage {
  readonly contactForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly uploadInput: Locator;
  readonly submitButton: Locator;
  readonly headerHomeLink: Locator;

  constructor(private readonly page: Page) {
    this.contactForm = page.locator('#contact-us-form');

    this.nameInput = this.contactForm.locator('[data-qa="name"]');
    this.emailInput = this.contactForm.locator('[data-qa="email"]');
    this.subjectInput = this.contactForm.locator('[data-qa="subject"]');
    this.messageInput = this.contactForm.locator('[data-qa="message"]');

    this.uploadInput = this.contactForm.locator('input[name="upload_file"]');

    this.submitButton = this.contactForm.locator('[data-qa="submit-button"]');

    this.headerHomeLink = page.locator('header').getByRole('link', { name: /home/i });
  }

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.contactForm).toBeVisible();
  }

  async fillForm(name: string, email: string, subject: string, message: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(fileName: string, content: string): Promise<void> {
    await this.uploadInput.setInputFiles({
      name: fileName,
      mimeType: 'text/plain',
      buffer: Buffer.from(content),
    });
  }

  async submitForm(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    const requestPromise = this.page.waitForRequest(
      (request) => {
        const url = new URL(request.url());
        const normalizedPath = url.pathname.replace(/\/$/, '');

        return normalizedPath === '/contact_us' && request.method() === 'POST';
      },
      {
        timeout: 15_000,
      },
    );

    const [request] = await Promise.all([requestPromise, this.submitButton.click()]);

    expect(request.method()).toBe('POST');
  }

  async clickHomeButton(): Promise<void> {
    await this.headerHomeLink.click();
    await expect(this.page).toHaveURL('/');
  }
}
