import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
require('dotenv').config();

import CONFIG from './config';

const browsersConfigs: PlaywrightTestConfig['use'] = {

  // Head
  headless: CONFIG.HEADLESS,
  /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
  actionTimeout: 30 * 1000,
  //navifation timeout
  navigationTimeout: 60 * 1000,
  /* Base URL to use in actions like `await page.goto('/')`. */
  // baseURL: 'http://localhost:3000',

  viewport: { width: 1920, height: 1080 },

  baseURL: `${CONFIG.BASE_URL}`,

  /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  trace: 'retain-on-failure',

  screenshot: 'only-on-failure',

  /* Set the video record to every test https://playwright.dev/docs/test-configuration#record-video */
  video: {
    mode: 'on-first-retry',
    size: {
      width: 1920,
      height: 1080
    }
  }
};


/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  /* Maximum time one test can run for. */
  timeout: 130 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 15 * 1000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 2,
  /* Opt out of parallel tests on CI. */
  workers: 4,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html',
      {
        outputFolder: './test-html-report/',
        openReport: 'on-failure'
      }
    ],
    ['junit', {
      outputFile: './test-xml-report/report.xml'
    }
    ],
    ['list']
  ],


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: 'chromium',
      testDir: './specs/tests/',
      // grep: /All/,
      use: {
        ...devices['Desktop Chrome'],
        ...browsersConfigs
      },
    },
    {
      name: 'firefox',
      testDir: './specs/tests/',
      // grep: /All/,
      use: {
        ...devices['Desktop Firefox'],
        ...browsersConfigs
      },
    },
    {
      name: 'webkit',
      testDir: './specs/tests/',
      // grep: /All/,
      use: {
        ...devices['Desktop Safari'],
        ...browsersConfigs
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results-artifacts/',

};

export default config;
