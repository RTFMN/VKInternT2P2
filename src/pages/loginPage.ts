import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) { }

  async goto() {
    await this.page.goto('https://github.com/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="login"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('input[name="commit"]');
  }
}
