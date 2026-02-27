import { expect, Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Account Information Page.
 * All methods are typed and leverage Playwright's strong typing support.
 */
export class AccountInfoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyAccountInfoPage(): Promise<void> {
    await expect(this.page.locator('text=ENTER ACCOUNT INFORMATION')).toBeVisible();
  }

  async fillAccountDetails(name: string, email: string, password: string): Promise<void> {
    // Assuming name and email are pre-filled, but to be safe, fill them
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
    await this.page.click('button[data-qa="signup-button"]');

    // Now fill account info
    await this.page.check('input[value="Mr"]');
    await this.page.fill('input[name="password"]', password);
    await this.page.selectOption('select[name="days"]', '1');
    await this.page.selectOption('select[name="months"]', 'January');
    await this.page.selectOption('select[name="years"]', '1990');

    await this.page.check('input[name="newsletter"]');
    await this.page.check('input[name="optin"]');
  }

  async fillAddressDetails(
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobile: string
  ): Promise<void> {
    await this.page.fill('input[name="first_name"]', firstName);
    await this.page.fill('input[name="last_name"]', lastName);
    await this.page.fill('input[name="company"]', company);
    await this.page.fill('input[name="address1"]', address1);
    await this.page.fill('input[name="address2"]', address2);
    await this.page.selectOption('select[name="country"]', country);
    await this.page.fill('input[name="state"]', state);
    await this.page.fill('input[name="city"]', city);
    await this.page.fill('input[name="zipcode"]', zipcode);
    await this.page.fill('input[name="mobile_number"]', mobile);
  }

  async createAccount(): Promise<void> {
    await this.page.click('button:has-text("Create Account")');
  }

  async verifyAccountCreated(): Promise<void> {
    await expect(this.page.locator('text=ACCOUNT CREATED!')).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.page.click('a[data-qa="continue-button"]');
  }

  async deleteAccount(): Promise<void> {
    await this.page.click('a[href="/delete_account"]');
  }

  async verifyAccountDeleted(): Promise<void> {
    await expect(this.page.locator('text=ACCOUNT DELETED!')).toBeVisible();
  }
}

// No module.exports; use ES module export
