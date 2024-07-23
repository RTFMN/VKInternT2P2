import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config()

export class IssuePage {
  constructor(private page: Page) { }

  async goto(repoUrl: string) {
    await this.page.goto(`${repoUrl}/issues`);
  }

  async createIssue(title: string, body: string, label: string) {
    await this.page.click(`a[href$="/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO_UI}/issues/new/choose"]`);
    await this.page.fill('input[name="issue[title]"]', title);
    await this.page.fill('textarea[name="issue[body]"]', body);
    await this.page.click(`details[id="labels-select-menu"]`)
    await this.page.click(`label[data-prio-filter-value="${label}"]`);
    await this.page.keyboard.press('Escape');
    await this.page.click('button[type="submit"]:has-text("Submit new issue")');
  }

  async verifyIssueExists(title: string) {
    await this.page.waitForSelector(`text=${title}`);
  }

  async editIssue(title: string, newBody: string) {
    await this.page.waitForSelector(`svg[aria-label="Show options"]`);
    await this.page.click('svg[aria-label="Show options"]');
    await this.page.click('button[aria-label="Edit comment"]');
    await this.page.fill('textarea[name="issue[body]"]', newBody);
    await this.page.click('span:has-text("Update comment")');
  }

  async closeIssue(title: string) {
    await this.page.waitForSelector(`button[name="comment_and_close"]`);
    await this.page.click('button[name="comment_and_close"]');
  }
}
