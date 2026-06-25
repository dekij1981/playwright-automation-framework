import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '@pages/HomePage';
import { SignupLoginPage } from '@pages/SignupLoginPage';
import { ContactUsPage } from '@pages/ContactUsPage';
import { AccountInfoPage } from '@pages/AccountInfoPage';

// 1. Definisanje tipova za custom page fixtures za punu IDE autokompleciju
type MyPageFixtures = {
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  contactUsPage: ContactUsPage;
  accountInfoPage: AccountInfoPage;
};

/**
 * 2. Proširivanje baznog Playwright testa.
 * Implementira Dependency Injection pattern - klase se instanciraju tek kada ih test zatraži.
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

export { expect };