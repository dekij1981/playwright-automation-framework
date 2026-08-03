import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model representing the Signup and Login page.
 * Handles selectors and actions for authenticating existing users and initializing new registrations.
 */
export class SignupLoginPage {
  private page: Page;
  private loginForm: Locator;
  private signupForm: Locator;

  constructor(page: Page) {
    this.page = page;

    // Scoped section containers to isolate elements and prevent form target overlapping
    this.loginForm = page.locator('.login-form');
    this.signupForm = page.locator('.signup-form');
  }

  // ==========================================
  // Login Methods
  // ==========================================

  /**
   * Verifies that the login form container heading section is visible on the view layer.
   */
  async verifyLoginSection(): Promise<void> {
    const loginHeading = this.loginForm.getByRole('heading', { name: /login to your account/i });
    await expect(loginHeading).toBeVisible();
  }

  /**
   * Logs into the application by populating target credentials scoped inside the login form container.
   */
  async login(email: string, password: string): Promise<void> {
    // Using robust attribute selectors explicitly nested within the login context layer
    await this.loginForm.locator('input[data-qa="login-email"]').fill(email);
    await this.loginForm.locator('input[data-qa="login-password"]').fill(password);
    await this.loginForm.getByRole('button', { name: /login/i }).click();
  }

  /**
   * Asserts the technical UI status dashboard text to guarantee successful session instantiation.
   */
  async verifyLoggedIn(username: string): Promise<void> {
    await expect(this.page.locator(`text=Logged in as ${username}`)).toBeVisible();
  }

  /**
   * Validates authentication failure boundaries by expecting error banner feedback structures.
   */
  async verifyLoginError(): Promise<void> {
    await expect(this.page.locator('text=Your email or password is incorrect!')).toBeVisible({
      timeout: 120000,
    });
  }

  // ==========================================
  // Signup Methods
  // ==========================================

  /**
   * Verifies that the signup form container heading section is visible on the view layer.
   */
  async verifySignupSection(): Promise<void> {
    const signupHeading = this.signupForm.getByRole('heading', { name: /new user signup!/i });
    await expect(signupHeading).toBeVisible();
  }

  /**
   * Initiates the new registration workflow path.
   * Leverages explicit data-qa tags within the signup form container to eliminate element target conflicts.
   */
  async startSignup(name: string, email: string): Promise<void> {
    // Fixes the element locator collision by scoping controls directly inside the signup form wrapper
    await this.signupForm.locator('input[data-qa="signup-name"]').fill(name);
    await this.signupForm.locator('input[data-qa="signup-email"]').fill(email);
    await this.signupForm.getByRole('button', { name: /signup/i }).click();
  }
}
