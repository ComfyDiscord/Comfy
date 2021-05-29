class Message {
  constructor(client) {
    this.client = client;
    this.enable = true;
  }

  async run(message) {
    const client = this.client;
    const Embeds = new (require('../Utils/Embeds'))(client);

    if (message.author.bot || message.system) return;

    if (!message.member && message.guild)
      message.member = await message.guild.members.fetch(message.author);

    if (!message.content.startsWith(client.config.Commands.Prefix)) return;

    const args = message.content
      .slice(client.config.Commands.Prefix.length)
      .trim()
      .split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

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
      message.delete();

      message.channel
        .send(
          await Embeds.error({
            title: `Cooldown! | @${message.member.displayName}`,
            description: 'You are currently under cooldown, try again soon!',
          })
        )
        .then((m) =>
          m.delete({
            timeout: client.config.Commands.Cooldown / 2,
          })
        );
    }
  }
}
module.exports = Message;
