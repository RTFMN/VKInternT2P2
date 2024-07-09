import { Page } from '@playwright/test';

export class IssuePage {
  constructor(private page: Page) {}

  async goto(repoUrl: string) {
    await this.page.goto(`${repoUrl}/issues`);
  }

  async createIssue(title: string, body: string, label: string) {
    await this.page.click('a[href$="/issues/new"]');
    await this.page.fill('input[name="issue[title]"]', title);
    await this.page.fill('textarea[name="issue[body]"]', body);
    await this.page.click(`span[title="${label}"]`);
    await this.page.click('button[type="submit"]');
  }

  async verifyIssueExists(title: string) {
    await this.page.waitForSelector(`text=${title}`);
  }

  async editIssue(title: string, newBody: string) {
    await this.page.click(`a:has-text("${title}")`);
    await this.page.click('button[aria-label="Edit issue"]');
    await this.page.fill('textarea[name="issue[body]"]', newBody);
    await this.page.click('button[type="submit"]');
  }

  async closeIssue(title: string) {
    await this.page.click(`a:has-text("${title}")`);
    await this.page.click('button[aria-label="Close issue"]');
  }
}
