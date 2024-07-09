import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { IssuePage } from '../pages/issuePage';

test.describe('GitHub Issues', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('your-username', 'your-password');
  });

  test('should create, verify, edit and close an issue', async ({ page }) => {
    const issuePage = new IssuePage(page);
    const repoUrl = 'https://github.com/your-username/your-repo';

    await issuePage.goto(repoUrl);
    await issuePage.createIssue('Issue 1', 'Я нашел баг', 'bug');
    await issuePage.verifyIssueExists('Issue 1');
    await issuePage.editIssue('Issue 1', 'Я нашел новый баг');
    await issuePage.closeIssue('Issue 1');
  });
});
