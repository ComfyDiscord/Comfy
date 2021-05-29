class Command {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name;
    this.aliases = options.aliases || [];
    this.description =
      options.description || 'No description provided, yell at the devs!';
    this.usage = options.usage || null;
    this.ownerOnly = options.ownerOnly || false;
    this.permission = options.permission || null;
  }

  async run() {
    return this.client.logger.log(
      `Command ${this.name} doesn't provide a run method!`
    );
  }
}

module.exports = Command;
