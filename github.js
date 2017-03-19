const reqPromise = require('request-promise');
const urlJoin = require('url-join');

class GitHub {
  constructor(token) {
    this.apiUrl = 'https://api.github.com';
    this.headers = {
      Authorization: `token ${token}`,
      'User-Agent': 'stripethree'
    };
  }

  createIssue(owner, repo, title, body, labels = []) {
    const reqBody = {
      title,
      body,
      assignees: [owner],
      labels
    }
    const options = {
      body: reqBody,
      headers: this.headers,
      method: 'POST',
      json: true,
      uri: urlJoin(this.apiUrl, 'repos', owner, repo, 'issues')
    }
    return reqPromise.post(options);
  }

  listIssues(owner, repo) {
    const options = {
      headers: this.headers,
      method: 'GET',
      json: true,
      uri: urlJoin(this.apiUrl, 'repos', owner, repo, 'issues')
    }
    return reqPromise.get(options);
  }
}

exports.GitHub = GitHub
