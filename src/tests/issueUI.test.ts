import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { IssuePage } from '../pages/issuePage';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';

dotenv.config()

test.describe('GitHub Issues UI', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(`${process.env.GITHUB_LOGIN}`, `${process.env.GITHUB_PASSWORD}`);
  });

  test('should create, verify, edit and close an issue via UI', async ({ page }) => {
    const issuePage = new IssuePage(page);
    const repoUrl = `https://github.com/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO_UI}`;

    allure.step('Navigate to Issues page', async () => {
      await issuePage.goto(repoUrl);
    });

    await page.waitForTimeout(2000);

    allure.step('Create a new issue', async () => {
      await issuePage.createIssue('Issue 1', 'Я нашел баг', 'bug');
    });

    await page.waitForTimeout(2000);

    allure.step('Verify the issue exists', async () => {
      await issuePage.verifyIssueExists('Issue 1');
    });

    await page.waitForTimeout(2000);

    allure.step('Edit the issue', async () => {
      await issuePage.editIssue('Issue 1', 'Я нашел новый баг');
    });

    await page.waitForTimeout(2000);

    allure.step('Close the issue', async () => {
      await issuePage.closeIssue('Issue 1');
    });
  });
}); 