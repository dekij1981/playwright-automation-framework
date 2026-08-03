import { expect, Page } from '@playwright/test';

/**
 * Page Object Model for the Account Information Page.
 * Handles selectors and actions required during the detailed user registration workflow.
 */
export class AccountInfoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Verifies that the Account Information Page has loaded successfully.
   * Leverages explicit URL pattern assertions and robust role-based locators to guarantee execution stability.
   */
  async verifyAccountInfoPage(): Promise<void> {
    // Wait for the browser context to completely transition to the signup endpoint path
    await expect(this.page).toHaveURL(/\/signup/);

    // Use a case-insensitive heading role locator to gracefully handle varying text transformations
    const heading = this.page.getByRole('heading', { name: /enter account information/i });
    await expect(heading).toBeVisible({ timeout: 10000 });
  }

  /**
   * Fills personal account profile configuration values such as title, credentials, and birth date parameters.
   * @param password - The security credential phrase string to provision the new profile with.
   */
  async fillAccountDetails(password: string): Promise<void> {
    // Select radio button choice for title prefix mapping
    await this.page.check('input[value="Mr"]');

    // Populate account security credentials
    await this.page.fill('input[name="password"]', password);

    // Select standard dropdown fields representing the target account date of birth parameters
    await this.page.selectOption('select[name="days"]', '1');
    await this.page.selectOption('select[name="months"]', 'January');
    await this.page.selectOption('select[name="years"]', '1990');

    // Opt-in to additional checkbox communication streams
    await this.page.check('input[name="newsletter"]');
    await this.page.check('input[name="optin"]');
  }

  /**
   * Populates physical address fields and metadata required for e-commerce shipment processing.
   */
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
    mobile: string,
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

  /**
   * Triggers the final registration submit mechanism to instantiate structural account records.
   */
  async createAccount(): Promise<void> {
    await this.page.click('button:has-text("Create Account")');
  }

  /**
   * Asserts the technical UI interface state to validate successful profile creation.
   */
  async verifyAccountCreated(): Promise<void> {
    const successHeading = this.page.getByRole('heading', { name: /account created!/i });
    await expect(successHeading).toBeVisible();
  }

  /**
   * Dispatches explicit link navigation interaction patterns to bypass status dashboards.
   */
  async clickContinue(): Promise<void> {
    await this.page.click('a[data-qa="continue-button"]');
  }

  /**
   * Dispatches direct pipeline triggers to invoke identity record removal processes.
   */
  async deleteAccount(): Promise<void> {
    await this.page.click('a[href="/delete_account"]');
  }

  /**
   * Validates structural record teardown mechanisms by asserting final user profile deletion views.
   */
  async verifyAccountDeleted(): Promise<void> {
    const deletedHeading = this.page.getByRole('heading', { name: /account deleted!/i });
    await expect(deletedHeading).toBeVisible();
  }
}
