import { expect, Locator, Page } from '@playwright/test';

export class AccountInfoPage {
  readonly accountInfoHeading: Locator;

  readonly titleMrRadio: Locator;
  readonly passwordInput: Locator;

  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;

  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileInput: Locator;

  readonly createAccountButton: Locator;
  readonly continueButton: Locator;
  readonly deleteAccountLink: Locator;

  readonly accountCreatedHeading: Locator;
  readonly accountDeletedHeading: Locator;

  constructor(private readonly page: Page) {
    this.accountInfoHeading = page.getByRole('heading', {
      name: /enter account information/i,
    });

    this.titleMrRadio = page.locator('input[value="Mr"]');
    this.passwordInput = page.locator('input[name="password"]');

    this.daySelect = page.locator('select[name="days"]');
    this.monthSelect = page.locator('select[name="months"]');
    this.yearSelect = page.locator('select[name="years"]');

    this.newsletterCheckbox = page.locator('input[name="newsletter"]');
    this.specialOffersCheckbox = page.locator('input[name="optin"]');

    this.firstNameInput = page.locator('input[name="first_name"]');
    this.lastNameInput = page.locator('input[name="last_name"]');
    this.companyInput = page.locator('input[name="company"]');
    this.address1Input = page.locator('input[name="address1"]');
    this.address2Input = page.locator('input[name="address2"]');

    this.countrySelect = page.locator('select[name="country"]');

    this.stateInput = page.locator('input[name="state"]');
    this.cityInput = page.locator('input[name="city"]');
    this.zipcodeInput = page.locator('input[name="zipcode"]');
    this.mobileInput = page.locator('input[name="mobile_number"]');

    this.createAccountButton = page.getByRole('button', {
      name: /create account/i,
    });

    this.continueButton = page.locator('[data-qa="continue-button"]');

    this.deleteAccountLink = page.locator('a[href="/delete_account"]');

    this.accountCreatedHeading = page.getByRole('heading', {
      name: /account created!/i,
    });

    this.accountDeletedHeading = page.getByRole('heading', {
      name: /account deleted!/i,
    });
  }

  async verifyAccountInfoPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/signup/);
    await expect(this.accountInfoHeading).toBeVisible();
  }

  async fillAccountDetails(password: string): Promise<void> {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(password);

    await this.daySelect.selectOption('1');
    await this.monthSelect.selectOption('January');
    await this.yearSelect.selectOption('1990');

    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();
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
    mobile: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.address1Input.fill(address1);
    await this.address2Input.fill(address2);

    await this.countrySelect.selectOption(country);

    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
    await this.zipcodeInput.fill(zipcode);
    await this.mobileInput.fill(mobile);
  }

  async createAccount(): Promise<void> {
    await this.createAccountButton.click();
  }

  async verifyAccountCreated(): Promise<void> {
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async deleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async verifyAccountDeleted(): Promise<void> {
    await expect(this.accountDeletedHeading).toBeVisible();
  }
}
