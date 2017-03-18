const { Messenger, responses } = require('launch-vehicle-fbm');
const messenger = new Messenger();

messenger.start();

messenger.on('text.greeting', ({senderId, session, firstName, surName, fullName}) => {
  return messenger.send(senderId, new responses.Text('🤖 beep bop boop. Well hello there, I am a bot.'));
});

messenger.on('text.help', ({senderId}) => {
  return messenger.send(senderId, new responses.Text('🤖 I am here to offer my services to assist you.'));
});

messenger.on('text', ({senderId, text, source}) => {
  const echo = new responses.Text(`Echo: "${text}"`);
  return messenger.send(senderId, echo);
});

messenger.on('message.image', ({senderId, url}) => {
  const imageEcho = new responses.Image(url);
  return messenger.send(senderId, imageEcho);
});
