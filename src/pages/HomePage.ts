import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly homeLink: Locator;
  readonly signupLoginLink: Locator;
  readonly contactUsLink: Locator;

  constructor(private readonly page: Page) {
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.signupLoginLink = page.getByRole('link', {
      name: 'Signup / Login',
    });
    this.contactUsLink = page.getByRole('link', {
      name: 'Contact us',
    });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async expectToBeLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async openSignupLoginPage(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async openContactUsPage(): Promise<void> {
    await this.contactUsLink.click();
  }

  async returnToHomePage(): Promise<void> {
    await this.homeLink.click();
  }
}
