import { expect, Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHome(): Promise<void> {
    await this.page.goto('http://automationexercise.com');
  }

  async verifyTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async clickContactUs(): Promise<void> {
    await this.page.click('a[href="/contact_us"]');
  }

  async clickSignupLogin(): Promise<void> {
    await this.page.click('text=Signup / Login');
  }

  async clickHome(): Promise<void> {
    await this.page.click('a[href="/"]');
  }
}
