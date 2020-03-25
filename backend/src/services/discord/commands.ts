export default {
  Ping: {
    name: 'ping',
    description: 'Ping!',
    execute(msg, args) {
      msg.reply('pong'); // returns "@personWhoTypedCommand, ${msg}"
    }
  }
};
