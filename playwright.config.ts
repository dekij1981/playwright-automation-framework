import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Parallel execution */
  fullyParallel: true,

  /* Prevent test.only on CI */
  forbidOnly: !!process.env.CI,

  /* Retries */
  retries: process.env.CI ? 2 : 0,

  /* Workers */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter */
  reporter: [['html'], ['list']],

  /* Shared test settings */
  use: {
    headless: true,

    /* Uncomment when you have env/base url */
    // baseURL: 'http://localhost:3000',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Browser projects */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Enable when needed
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Optional dev server */
  /*
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  */
});