const config = require('config');
const debug = require('debug')('enterprise-fbm');
const logError = require('debug')('enterprise-fbm:error');
const { Messenger, Generic, Image, Text } = require('launch-vehicle-fbm');

const { GitHub } = require('./github');

const ghClient = new GitHub(config.get('github.accessToken'));
const messenger = new Messenger();

const QUESTION_REGEX = /\?$/;
const REPO_NAME = config.get('github.repoName');
const REPO_OWNER = config.get('github.repoOwner');

messenger.start();

messenger.on('text.greeting', ({senderId, session, firstName, surName, fullName}) => {
  return messenger.send(senderId, new Text('greetingReply'));
});

messenger.on('text.help', ({senderId}) => {
  return messenger.send(senderId, new Text('helpReply'))
});

messenger.on('text', ({senderId, session, source, text}) => {

  if (QUESTION_REGEX.test(text)) {
    const issueTitle = `Question submitted by ${session.profile.first_name} ${session.profile.last_name}`;
    const issueBody = `${session.profile.first_name} ${session.profile.last_name} (Messenger ID: ${senderId}) asked: ${text}`;
    const labels = ['question'];

    return ghClient.createIssue(REPO_OWNER, REPO_NAME, issueTitle, issueBody, labels)
      .then((res) => {
        return messenger.send(senderId, new Text(`Thanks for the question, ${session.profile.first_name}!`));
      })
      .catch((err) => {
        logError(`Failed to create issue in repo "${REPO_NAME}"`);
        return messenger.send(senderId, new Text(`Sorry, ${session.profile.first_name}, there was a problem adding your question`));
      });
  }

  if (text === 'show questions') {
    return ghClient.listIssues(REPO_OWNER, REPO_NAME)
      .then((res) => {
        const elements = res.map((issue) => {
          return {
            title: `${issue.title} (#${issue.number})`,
            subtitle: issue.body,
            buttons:[{
                type: 'web_url',
                url: issue.url,
                title: 'View on Github'
            }]
          };
        });
        return messenger.send(senderId, new Generic(elements));
      })
      .catch((err) => {
        logError(`Failed to list issues for repo "${REPO_NAME}"`);
        return messenger.send(senderId, new Text(`Sorry, ${session.profile.first_name}, there was a problem listing the questions`));
      });
  }

  // messages!
  /*
  if (text === 'ping') {
    return messenger.send(senderId, new Text('pong'));
  }
  */
  /*
  if (text === 'catch me') {
    return messenger.send(senderId, new Text('catchAll'))
  }
  */

  return messenger.send(senderId, new Text(`Echo: "${text}"`));
});

messenger.on('message.image', ({senderId, url}) => {
  return messenger.send(senderId, new Image(url));
});
