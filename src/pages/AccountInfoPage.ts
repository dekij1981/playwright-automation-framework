import { expect, Page } from '@playwright/test';

/**
 * Page Object Model for the Account Information Page.
 */
export class AccountInfoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyAccountInfoPage(): Promise<void> {
    await expect(this.page.locator('text=ENTER ACCOUNT INFORMATION')).toBeVisible();
  }

  async fillAccountDetails(password: string): Promise<void> {
    // Selektovanje titule, lozinke i datuma rođenja
    await this.page.check('input[value="Mr"]');
    await this.page.fill('input[name="password"]', password);
    await this.page.selectOption('select[name="days"]', '1');
    await this.page.selectOption('select[name="months"]', 'January');
    await this.page.selectOption('select[name="years"]', '1990');

    // Newsletter i ponude
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