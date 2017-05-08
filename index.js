const { Messenger, responses } = require('launch-vehicle-fbm');
const messenger = new Messenger(
  // toggle greetings off:
  // { emitGreetings: false }

  // override greeting regex:
  // { emitGreetings: /^(good-?)?bye/i }
);

messenger.start();

messenger.on('text.greeting', ({reply, firstName}) => {
  const text = new responses.Text(`🤖  Beep bop boop. Well hello there, ${firstName}, I am a bot.`);

  // text translation, inspired by get-text: https://en.wikipedia.org/wiki/Gettext
  // const text = new responses.Text('greetingReply1');

  // support for printf-like sytanx
  // const text = new responses.Text('greetingReply2', firstName);

  reply(text);
});

messenger.on('text.help', ({reply}) => {
  reply(new responses.Text('🤖  I am here to offer my services to assist you.'));
});

messenger.on('text', ({reply, senderId, session, text, source}) => {

  // using the sessiono object - simple message history
  /*
  const matchesLast = text.match(/^last (\d)$/i);
  if (matchesLast) {
    if (session.messages && session.messages.length) {
      const history = session.messages.slice(parseInt(matchesLast[1], 10)*-1).reverse().map((message, index) => `${index+1}. ${message}`).join('\n');
      reply(new responses.Text('historyReply', matchesLast[1], history));
    } else {
      reply(new responses.Text('noHistoryReply'));
    }
    return;
  }
  session.messages ? session.messages.push(text) : session.messages = [text];
  */
  reply(new responses.Text(`Echo: "${text}"`));
});

messenger.on('message.image', ({reply, url}) => {
  reply(new responses.Image(url));
});

/*
// access underlying expressjs instance
messenger.app.get(`/superbot`, (req, res) => {
  res.send('🤖');
});
*/
