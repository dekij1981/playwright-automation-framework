const { expect } = require('@playwright/test');

class AccountInfoPage {
  constructor(page) {
    this.page = page;
  }

  async verifyAccountInfoPage() {
    await expect(this.page.locator('text=ENTER ACCOUNT INFORMATION')).toBeVisible();
  }

  async fillAccountDetails(name, email, password) {
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

  async fillAddressDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobile) {
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

  async createAccount() {
    await this.page.click('button:has-text("Create Account")');
  }

  async verifyAccountCreated() {
    await expect(this.page.locator('text=ACCOUNT CREATED!')).toBeVisible();
  }

  async clickContinue() {
    await this.page.click('a[data-qa="continue-button"]');
  }

  async deleteAccount() {
    await this.page.click('a[href="/delete_account"]');
  }

  async verifyAccountDeleted() {
    await expect(this.page.locator('text=ACCOUNT DELETED!')).toBeVisible();
  }
}

module.exports = AccountInfoPage;