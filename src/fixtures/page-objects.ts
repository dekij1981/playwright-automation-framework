import { test as base, expect } from '@playwright/test';
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
  page: async ({ page }, use) => {

    const blockedDomains = [
      'googlesyndication',
      'doubleclick',
      'googleads',
      'adservice',
      'google-analytics',
      'analytics',
      'facebook',
      'adsystem',
    ];

    await page.route('**/*', (route) => {
      const url = route.request().url();

      if (blockedDomains.some(domain => url.includes(domain))) {
        return route.abort();
      }

      return route.continue();
    });

    await page.addInitScript(() => {
      const removeAds = () => {
        document.querySelectorAll('iframe').forEach((el) => {
          const src = el.getAttribute('src') || '';
          if (
            src.includes('google') ||
            src.includes('ads') ||
            src.includes('doubleclick')
          ) {
            el.remove();
          }
        });
      };

      new MutationObserver(removeAds).observe(document, {
        childList: true,
        subtree: true,
      });

      removeAds();
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