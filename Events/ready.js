class Ready {
  constructor(client) {
    this.client = client;
    this.enable = true;
  }

  async run() {
    this.client.logger.success(`Logged in as ${this.client.user.tag}!`);
  }
}
module.exports = Ready;
