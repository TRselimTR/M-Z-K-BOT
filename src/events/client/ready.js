const chalk = require('chalk');

module.exports = {
  name: "ready",
  once: true,
  async execute(bot) {
    //initializing commands
    require("../../handler/CommandHandler")(bot);

    const formatNum = bot.utils.formatNumber;

    const serverCount = formatNum(bot.guilds.cache.size);
    const channelCount = formatNum(bot.channels.cache.size);
    const userCount = formatNum(
      bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
    );

    const statuses = [
      { "name": `${serverCount} sunucuya & ${userCount} kullanıcıya ve ${channelCount} adet kanala hizmet veriyor`, "type": "WATCHING" },
      { "name": "\/çal", "type": "LISTENING" },
      { "name": "\/yardım", "type": "PLAYING" }
    ];

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status.name, { type: status.type });
    }, 60000);
  }
};