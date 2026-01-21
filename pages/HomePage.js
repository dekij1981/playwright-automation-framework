const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToHome() {
    await this.page.goto('http://automationexercise.com');
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async clickContactUs() {
    await this.page.click('a[href="/contact_us"]');
  }

  async clickSignupLogin() {
    await this.page.click('text=Signup / Login');
  }

  async clickHome() {
    await this.page.click('a[href="/"]');
  }
}

module.exports = HomePage;