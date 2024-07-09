import axios from 'axios';

const BASE_URL = 'https://api.github.com';
const TOKEN = 'YOUR_GITHUB_TOKEN';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `token ${TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  }
});

export const createIssue = async (owner: string, repo: string, title: string, body: string, labels: string[], assignees: string[]) => {
  const response = await api.post(`/repos/${owner}/${repo}/issues`, {
    title,
    body,
    labels,
    assignees
  });
  return response.data;
};

export const getIssues = async (owner: string, repo: string) => {
  const response = await api.get(`/repos/${owner}/${repo}/issues`);
  return response.data;
};

export const editIssue = async (owner: string, repo: string, issueNumber: number, body: string) => {
  const response = await api.patch(`/repos/${owner}/${repo}/issues/${issueNumber}`, {
    body
  });
  return response.data;
};

export const closeIssue = async (owner: string, repo: string, issueNumber: number) => {
  const response = await api.patch(`/repos/${owner}/${repo}/issues/${issueNumber}`, {
    state: 'closed'
  });
  return response.data;
};
