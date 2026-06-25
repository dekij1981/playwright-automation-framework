import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { AccountInfoPage } from '../pages/AccountInfoPage';

// 1. Define the types for our custom page fixtures for full IDE autocompletion
type MyPageFixtures = {
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  contactUsPage: ContactUsPage;
  accountInfoPage: AccountInfoPage;
};

/**
 * 2. Extend the base Playwright test to include our customized Page Objects.
 * This implements the Dependency Injection pattern, ensuring that page classes
 * are only instantiated lazily when requested by a specific test block.
 */
export const test = base.extend<MyPageFixtures>({
  homePage: async ({ page }: { page: Page }, use: (r: HomePage) => Promise<void>) => {
    await use(new HomePage(page));
  },
  signupLoginPage: async ({ page }: { page: Page }, use: (r: SignupLoginPage) => Promise<void>) => {
    await use(new SignupLoginPage(page));
  },
  contactUsPage: async ({ page }: { page: Page }, use: (r: ContactUsPage) => Promise<void>) => {
    await use(new ContactUsPage(page));
  },
  accountInfoPage: async ({ page }: { page: Page }, use: (r: AccountInfoPage) => Promise<void>) => {
    await use(new AccountInfoPage(page));
  },
});

// Re-export the expect utility so tests can import everything from this single file
export { expect };