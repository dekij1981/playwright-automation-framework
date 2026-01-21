const { expect } = require('@playwright/test');

class ContactUsPage {
  constructor(page) {
    this.page = page;
    this.contactForm = this.page.locator('#contact-page form');
    this.name = this.contactForm.locator('input[data-qa="name"]');
    this.email = this.contactForm.locator('input[data-qa="email"]');
    this.subject = this.contactForm.locator('input[data-qa="subject"]');
    this.message = this.contactForm.locator('textarea[data-qa="message"]');
    this.upload = this.contactForm.locator('input[name="upload_file"]');
    this.submitBtn = this.contactForm.getByRole('button', { name: /^submit$/i });
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/\/contact_us/);
    await expect(this.contactForm).toBeVisible();
  }

  async fillForm(name, email, subject, message) {
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

  async uploadFile() {
    await this.upload.setInputFiles({
      name: 'contact.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Attachment from Playwright Contact Us test.')
    });
  }

async submitForm() {
  await this.submitBtn.scrollIntoViewIfNeeded();
  await expect(this.submitBtn).toBeEnabled();

  // Handle the confirmation dialog that appears on submit
  await Promise.all([
    this.page.waitForEvent('dialog').then(d => d.accept()),
    this.submitBtn.click(),
  ]);
}

  async verifySuccessMessage() {
    const successMsg = this.page
      .locator('.status.alert.alert-success, #success-subscribe .alert-success')
      .filter({ hasText: 'Success! Your details have been submitted successfully.' })
      .first();
    await expect(successMsg).toBeVisible({ timeout: 20_000 });
  }
}

module.exports = ContactUsPage;