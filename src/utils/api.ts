import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const createIssue = async (owner: string, repo: string, title: string, body: string, labels: string[]) => {
  const response = await octokit.request('POST /repos/{owner}/{repo}/issues', {
    owner: owner,
    repo: repo,
    title: title,
    body: body,
    labels: labels,
    headers: {
      "accept": "application/vnd.github+json",
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  return response.data;
};

export const getIssues = async (owner: string, repo: string) => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: owner,
    repo: repo,
    headers: {
      "accept": "application/vnd.github+json",
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  return response.data;
};

export const editIssue = async (owner: string, repo: string, issueNumber: number, body: string) => {
  const response = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: owner,
    repo: repo,
    issue_number: issueNumber,
    body: body,
    headers: {
      "accept": "application/vnd.github+json",
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  return response.data;
};

export const closeIssue = async (owner: string, repo: string, issueNumber: number) => {
  const response = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: owner,
    repo: repo,
    issue_number: issueNumber,
    state: "closed",
    headers: {
      "accept": "application/vnd.github+json",
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  return response.data;
};
