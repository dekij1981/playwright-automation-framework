import { Page, Locator, expect } from '@playwright/test';

export class SignupLoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Login methods
  async verifyLoginSection(): Promise<void> {
    await expect(this.page.locator('text=Login to your account')).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button:has-text("Login")');
  }

  async verifyLoggedIn(username: string): Promise<void> {
    await expect(this.page.locator(`text=Logged in as ${username}`)).toBeVisible();
  }

  async verifyLoginError(): Promise<void> {
    await expect(this.page.locator('text=Your email or password is incorrect!')).toBeVisible({ timeout: 120000 });
  }

  // Signup methods
  async verifySignupSection(): Promise<void> {
    await expect(this.page.locator('text=New User Signup!')).toBeVisible();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.page.fill('input[name="name"]', name);
    await this.page.fill('input[name="email"]', email);
    await this.page.click('button:has-text("Signup")');
  }
}
