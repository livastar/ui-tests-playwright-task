import { defineConfig, devices } from '@playwright/test';

const CI: boolean = process.platform === 'win32' || process.platform === 'darwin' ? false : true;
/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  /* Maximum time one test can run for. */
  timeout: 90 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 20 * 1000,
  },
  /* Root directory for tests. */
  testDir: './src/',
  /* Test files glob pattern. */
  globalTimeout: CI ? 60 * 60 * 1000 : undefined,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!CI,
  /* Retry on CI only */
  retries: CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: CI ? 3 : undefined,
  // Limit the number of failures on CI to save resources
  maxFailures: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: './playwright-report/html',
        open: 'on-failure',
      },
    ],
  ],
  /* Directory to store the reports. */
  outputDir: 'playwright-report/test-results-artifacts/',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Headless mode
    headless: false,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 15 * 1000,
    // navigation timeout
    navigationTimeout: 100 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Browser context to use. See https://playwright.dev/docs/api/class-browser#browsernewcontextoptions */
    viewport: { width: 1920, height: 1080 },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',

    /* Set the video record to every test https://playwright.dev/docs/test-configuration#record-video */
    video: {
      mode: 'on-first-retry',
      size: {
        width: 1920,
        height: 1080,
      },
    },

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://samples.gwtproject.org/samples/Showcase/Showcase.html#!CwCheckBox',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    // {
    //   name: 'edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //   },
    // },
  ],
});
