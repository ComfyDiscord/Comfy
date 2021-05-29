const chalk = require('chalk');

class Logger {
  constructor(options = {}) {
    this.options = options;
    this.neutral = (args) =>
      console.log(
        chalk.grey('[LOG] ' + args || 'Log method without any args? wtf man')
      );
    this.error = (args) =>
      console.error(
        chalk.redBright(
          '[ERROR] ' + args || 'Log method without any args? wtf man'
        )
      );
    this.success = (args) =>
      console.log(
        chalk.greenBright(
          '[SUCCESS] ' + args || 'Log method without any args? wtf man'
        )
      );
    this.warning = (args) =>
      console.warn(
        chalk.yellow(
          '[WARNING] ' + args || 'Log method without any args? wtf man'
        )
      );
  }

  async log(str) {
    this.neutral(str);
  }

  async error(str) {
    this.error(str);
  }

  async success(str) {
    this.success(str);
  }

  async warning(str) {
    this.warning(str);
  }
}

module.exports = Logger;
