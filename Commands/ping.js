const Discord = require('discord.js'),
  path = require('path'),
  Command = require('../Structures/Command.js');

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['pong'],
      description: 'Ping!',
      usage: '<pong>',
      ownerOnly: false,
      permission: 'VIEW_CHANNEL',
    });
  }

  async run(client, message, args) {
    message.reply('hi');
  }
}

module.exports = Ping;
