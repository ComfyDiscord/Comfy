require('dotenv/config');

module.exports = {
  System: {
    Token: process.env.TOKEN,
    Database: {
      URL: process.env.DB,
      Options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      },
    },
  },
  Commands: {
    Prefix: ';',
    BotMaster: '334392742266535957',
    Cooldown: 10000,
  },
};
