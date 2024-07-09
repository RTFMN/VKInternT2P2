import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://github.com',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on',
  },
  reporter: [['line'], ['allure-playwright']],
});