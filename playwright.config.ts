import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 * Crucial pattern for managing multi-environment configurations and credentials safely.
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  // Target directory containing the refactored end-to-end test suites
  testDir: './src/tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only was accidentally left in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only (2 times), keep it 0 locally for faster feedback loops */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI to optimize resource consumption; utilize full CPU power locally */
  workers: process.env.CI ? 2 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. Consolidated in config to prevent UI hardcoding. */
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',

    /* Run tests in headless mode (no browser GUI) to ensure maximum speed and compatibility with CI pipelines */
    headless: true,

    /* Production-ready anti-flakiness and debugging asset strategies */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    
    /* Suppress HTTPS certificate issues commonly found in staging/test environments */
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Explicitly defining viewport dimensions to enforce visual consistency across environments
        viewport: { width: 1280, height: 720 },
      },
    },
    /* Uncomment below for cross-browser test coverage when expanding the portfolio matrix
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});