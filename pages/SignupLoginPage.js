const { expect } = require('@playwright/test');

class SignupLoginPage {
  constructor(page) {
    this.page = page;
  }

  // Login methods
  async verifyLoginSection() {
    await expect(this.page.locator('text=Login to your account')).toBeVisible();
  }

  async login(email, password) {
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button:has-text("Login")');
  }

  async verifyLoggedIn(username) {
    await expect(this.page.locator(`text=Logged in as ${username}`)).toBeVisible();
  }

  async verifyLoginError() {
    await expect(this.page.locator('text=Your email or password is incorrect!')).toBeVisible({ timeout: 120000 });
  }

  // Signup methods
  async verifySignupSection() {
    await expect(this.page.locator('text=New User Signup!')).toBeVisible();
  }

  async startSignup(name, email) {
    await this.page.fill('input[name="name"]', name);
    await this.page.fill('input[name="email"]', email);
    await this.page.click('button:has-text("Signup")');
  }
}

module.exports = SignupLoginPage;