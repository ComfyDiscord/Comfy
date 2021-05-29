const Discord = require('discord.js'),
  path = require('path'),
  glob = require('glob'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  Command = require('../Structures/Command');

class Comfy extends Discord.Client {
  constructor(options = {}) {
    super(options);

    this.config = require('../config');
    this.logger = new (require('../Utils/Logger'))();
    this.cooldowns = new Discord.Collection();
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  async loadCommands() {
    glob(`${this.directory}/Commands/**/*.js`, (er, files) => {
      if (er) return this.logger.error(er);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const command = new (require(file))(this);
        const filename = file.slice(file.lastIndexOf('/') + 1, file.length - 3);

        if (!(command instanceof Command))
          return this.logger.error(
            `Command ${filename} is not a valid command.`
          );

        this.commands.set(command.name, command);

        command.aliases.length &&
          command.aliases.map((alias) => this.aliases.set(alias, command.name));

        this.logger.success(`${filename} loaded!`);
      }
    });
  }

  async loadEvents() {
    glob(`${this.directory}/Events/**/*.js`, (er, files) => {
      if (er) return this.client.logger.error(er);

      for (const file of files) {
        delete require.cache[[`${file}`]];
        const event = new (require(file))(this),
          eventName = file.slice(file.lastIndexOf('/') + 1, file.length - 3);

        if (!event.enable)
          return this.logger.warning(`${eventName} event is disabled.`);
        if (event.enable) super.on(eventName, (...args) => event.run(...args));
      }
    });
  }

  async databaseInit() {
    mongoose
      .connect(
        this.config.System.Database.URL,
        this.config.System.Database.Options
      )
      .then((connection) => {
        return this.logger.success(`Connected to the database!`);
      });
  }

  async login() {
    super.login(this.config.System.Token);
  }

  async init() {
    this.loadCommands();
    this.loadEvents();
    this.databaseInit();
    this.login();
  }
}

module.exports = Comfy;
