class Message {
  constructor(client) {
    this.client = client;
    this.enable = true;
  }

  async run(message) {
    const client = this.client;

    if (message.author.bot || message.system) return;

    if (!message.member && message.guild)
      message.member = await message.guild.members.fetch(message.author);

    if (!message.content.startsWith(client.config.Commands.Prefix)) return;

    const args = message.content
      .slice(client.config.Commands.Prefix.length)
      .trim()
      .split(/ +/g);
    const command = client.commands.get(args.shift().toLowerCase());

    if (!command || command == null) return;

    if (
      command.ownerOnly &&
      message.member.id !== client.config.Commands.BotMaster
    )
      return;
    if (
      command.permission &&
      !message.member.permissions.has(command.permission)
    )
      return;

    if (!client.cooldowns.get(message.author.id)) {
      command.run(client, message, args);
      client.cooldowns.set(message.author.id, true);
      setTimeout(() => {
        client.cooldowns.set(message.author.id, false);
      }, client.config.Commands.Cooldown);
    } else {
      console.log("you're being affected by cooldown rn :)");
    }
  }
}
module.exports = Message;
