import { expect, Page } from '@playwright/test';

/**
 * Page Object Model representing the Home page components and actions.
 */
export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates the browser context directly to the base application home URL.
   */
  async navigateToHome(): Promise<void> {
    await this.page.goto('http://automationexercise.com');
  }

  /**
   * Asserts that the current page title matches the official application naming pattern.
   */
  async verifyTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  /**
   * Executes a programmatic click action on the Contact Us navigation link element.
   */
  async clickContactUs(): Promise<void> {
    await this.page.click('a[href="/contact_us"]');
  }

  /**
   * Executes a programmatic click action on the Signup / Login navigation text link.
   */
  async clickSignupLogin(): Promise<void> {
    await this.page.click('text=Signup / Login');
  }

  /**
   * Routes the context back to root landing view by clicking the explicit Home button.
   */
  async clickHome(): Promise<void> {
    await this.page.click('a[href="/"]');
  }
}