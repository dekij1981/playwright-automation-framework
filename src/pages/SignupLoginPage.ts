import { expect, Locator, Page } from '@playwright/test';

export class SignupLoginPage {
  readonly loginForm: Locator;
  readonly loginHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  readonly signupForm: Locator;
  readonly signupHeading: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(private readonly page: Page) {
    this.loginForm = page.locator('.login-form');
    this.loginHeading = this.loginForm.getByRole('heading', {
      name: 'Login to your account',
    });
    this.loginEmailInput = this.loginForm.locator('[data-qa="login-email"]');
    this.loginPasswordInput = this.loginForm.locator('[data-qa="login-password"]');
    this.loginButton = this.loginForm.getByRole('button', {
      name: 'Login',
    });
    this.loginErrorMessage = this.loginForm.getByText('Your email or password is incorrect!');

    this.signupForm = page.locator('.signup-form');
    this.signupHeading = this.signupForm.getByRole('heading', {
      name: 'New User Signup!',
    });
    this.signupNameInput = this.signupForm.locator('[data-qa="signup-name"]');
    this.signupEmailInput = this.signupForm.locator('[data-qa="signup-email"]');
    this.signupButton = this.signupForm.getByRole('button', {
      name: 'Signup',
    });
  }

  async verifyLoginSection(): Promise<void> {
    await expect(this.loginHeading).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoggedIn(username: string): Promise<void> {
    const loggedInIndicator = this.page.getByText(`Logged in as ${username}`, {
      exact: false,
    });

    await expect(loggedInIndicator).toBeVisible();
  }

  async verifyLoginError(): Promise<void> {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async verifySignupSection(): Promise<void> {
    await expect(this.signupHeading).toBeVisible();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}
