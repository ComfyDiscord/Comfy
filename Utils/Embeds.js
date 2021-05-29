const { MessageEmbed } = require('discord.js');

class Embeds {
  constructor(client) {
    this.client = client;
  }

  async neutral(
    options = {
      title: 'No title was given :(',
      description: 'No description was given :(',
    }
  ) {
    return new MessageEmbed()
      .setColor(this.client.config.Colors.Neutral)
      .setTitle(options.title)
      .setDescription(options.description)
      .setTimestamp()
      .setFooter(`ComfyBot`);
  }

  async error(
    options = {
      title: 'An error occurred',
      description: 'No description was given :(',
    }
  ) {
    return new MessageEmbed()
      .setColor(this.client.config.Colors.Error)
      .setTitle(options.title)
      .setDescription(options.description)
      .setTimestamp()
      .setFooter(`ComfyBot`);
  }
}

module.exports = Embeds;
