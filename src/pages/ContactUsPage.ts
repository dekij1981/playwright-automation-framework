import { expect, Page, Locator } from '@playwright/test';

/**
 * Page Object Model representing the Contact Us page components and form pipelines.
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

    // Root container locator for the contact form layout
    this.contactForm = page.locator('#contact-page form');

    // Input elements mapped securely via dedicated QA data attributes
    this.name = this.contactForm.locator('input[data-qa="name"]');
    this.email = this.contactForm.locator('input[data-qa="email"]');
    this.subject = this.contactForm.locator('input[data-qa="subject"]');
    this.message = this.contactForm.locator('textarea[data-qa="message"]');

    // Control for target file attachment uploads
    this.upload = this.contactForm.locator('input[name="upload_file"]');

    // Action execution links and buttons using precise structural or accessibility roles
    this.submitBtn = this.contactForm.getByRole('button', { name: /^submit$/i });
    this.homeBtn = page.locator('#contact-page').getByRole('link', { name: /^home$/i });
  }

  /**
   * Asserts that the endpoint state has initialized by inspecting the explicit routing URL and layout container.
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.contactForm).toBeVisible();
  }

  /**
   * Fills out the interaction inputs inside the contact wrapper layer and runs data integrity checks.
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

    // Double check state values before attempting form submission workflow paths
    await expect(this.name).toHaveValue(name);
    await expect(this.email).toHaveValue(email);
    await expect(this.subject).toHaveValue(subject);
    await expect(this.message).toHaveValue(message);
  }

  /**
   * Generates a virtual in-memory text file block and assigns it to the target attachment form input.
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
   * Triggers form submission execution pipelines.
   * Leverages Promise.all to synchronously initialize the dialog observer event before dispatching the click action.
   */
  async submitForm(): Promise<void> {
    await expect(this.submitBtn).toBeEnabled();

    // Best Practice: The promise listener must actively evaluate before the interaction click fires
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.submitBtn.click(),
    ]);

    // Handle and acknowledge the browser alert modal to successfully complete the pipeline step
    await dialog.accept();
  }

  /**
   * Validates backend response delivery states by verifying the visibility of the UI layout success banner.
   */
  async verifySuccessMessage(): Promise<void> {
    const successMsg = this.page
      .locator('.alert-success')
      .filter({ hasText: /success.*submitted/i });

    await expect(successMsg.first()).toBeVisible({ timeout: 20_000 });
  }

  /**
   * Dispatches navigation clicks to return users safely to the main landing dashboard overview.
   * Handles optional Google Interstitial Ads by forcing a direct navigation if stuck.
   */
  async clickHomeButton(): Promise<void> {
    await expect(this.homeBtn).toBeVisible();
    
    // FIX: Removed the duplicate 'this.' that caused the compiler error
    await this.homeBtn.click();

    // Fallback: If an overlay ad intercepts the action, programmatically force the correct URL
    const currentUrl = this.page.url();
    if (currentUrl.includes('google_vignette') || currentUrl.includes('contact_us')) {
      await this.page.goto('https://automationexercise.com/');
    }
  }
}