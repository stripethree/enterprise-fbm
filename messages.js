// Similar to a 'messages.pot' for internationalization
module.exports = {
  catchAll: [
    'catch all number one',
    'catch all number two',
    'catch all number three'
  ],
  // You can't .split() unicode, but spread works
  // https://ponyfoo.com/articles/es6-strings-and-unicode-in-depth
  emoji: [...'💋😂😽'],
  greetingReply: '🤖 beep bop boop. Well hello there, I am a bot.',
  helpReply: '🤖 Ask me a question, and I open a GitHub issue for you.',
  pong: 'PONG!'
};
