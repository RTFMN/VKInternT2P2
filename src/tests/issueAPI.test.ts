import { test, expect } from '@playwright/test';
import { createIssue, getIssues, editIssue, closeIssue } from '../utils/api';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';

test.describe('GitHub Issues API', () => {
    dotenv.config()

    test('should create, verify, edit and delete an issue via API', async () => {
        const repoOwner = process.env.GITHUB_USERNAME;
        const repoName = process.env.GITHUB_REPO_API;
        const issueTitle = 'Issue 1 API';
        const issueBody = 'Я нашел баг API';
        const updatedIssueBody = 'Я нашел новый баг API';
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        allure.step('Create a new issue via API', async () => {
            const issue = await createIssue(repoOwner, repoName, issueTitle, issueBody, ['bug']);
            expect(issue.title).toBe(issueTitle);
        });

        await sleep(1000);

        allure.step('Verify the issue exists via API', async () => {
            const issues = await getIssues(repoOwner, repoName);
            const issue = issues.find((issue) => issue.title === issueTitle);
            expect(issue).not.toBeNull();
        });

        await sleep(1000);

        allure.step('Edit the issue via API', async () => {
            const issues = await getIssues(repoOwner, repoName);
            var issue = issues.find((issue) => issue.title === issueTitle);
            issue = await editIssue(repoOwner, repoName, issue.number, updatedIssueBody);
            expect(issue?.body).toBe(updatedIssueBody);
        });

        await sleep(1000);

        allure.step('Delete the issue via API', async () => {
            const issues = await getIssues(repoOwner, repoName);
            var issue = issues.find((issue) => issue.title === issueTitle);
            issue = await closeIssue(repoOwner, repoName, issue.number);
            expect(issue?.state).toBe('closed');
        });

        await sleep(1000);
    });
}); 