import { expect, Locator, Page } from '@playwright/test';

import type { AccountDetails, AddressDetails } from '@data/registration';

export class AccountInfoPage {
  readonly accountInfoHeading: Locator;
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

  async fillAccountDetails(details: AccountDetails): Promise<void> {
    await this.page.locator(`input[value="${details.title}"]`).check();

    await this.passwordInput.fill(details.password);

    await this.daySelect.selectOption(details.birthDay);
    await this.monthSelect.selectOption(details.birthMonth);
    await this.yearSelect.selectOption(details.birthYear);

    if (details.newsletter) {
      await this.newsletterCheckbox.check();
    }

    if (details.specialOffers) {
      await this.specialOffersCheckbox.check();
    }
  }

  async fillAddressDetails(details: AddressDetails): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.companyInput.fill(details.company);
    await this.address1Input.fill(details.address1);
    await this.address2Input.fill(details.address2);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileInput.fill(details.mobile);
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
