const { Messenger, responses } = require('launch-vehicle-fbm');
const messenger = new Messenger(
  // toggle greetings off:
  // { emitGreetings: false }

  // override greeting regex:
  // { emitGreetings: /^(good-?)?bye/i }
);

messenger.start();

messenger.on('text.greeting', ({reply, firstName}) => {
  reply(new responses.Text(`🤖  Beep bop boop. Well hello there, ${firstName}, I am a bot.`));
});

messenger.on('text.help', ({reply}) => {
  reply(new responses.Text('🤖  I am here to offer my services to assist you.'));
});

messenger.on('text', ({reply, senderId, text, source}) => {
  reply(new responses.Text(`Echo: "${text}"`));
});

messenger.on('message.image', ({reply, url}) => {
  reply(new responses.Image(url));
});
