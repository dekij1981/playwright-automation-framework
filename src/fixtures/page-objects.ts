import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { AccountInfoPage } from '../pages/AccountInfoPage';

type MyPageFixtures = {
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  contactUsPage: ContactUsPage;
  accountInfoPage: AccountInfoPage;
};

export const test = base.extend<MyPageFixtures>({
  // Intercept the page instance to route out ad domains safely before injecting the page models
  page: async ({ page }, use) => {
    await page.route('**/*.{js,html}*', (route) => {
      const url = route.request().url();
      if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
        route.abort();
      } else {
        route.continue();
      }
    });
    await use(page);
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupLoginPage: async ({ page }, use) => {
    await use(new SignupLoginPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },
  accountInfoPage: async ({ page }, use) => {
    await use(new AccountInfoPage(page));
  },
});

export { expect };