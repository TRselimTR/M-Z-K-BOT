module.exports = {
  name: "channelEmpty",
  execute(bot, queue) {
    return bot.say.queueMessage(queue, "Yalnız kaldığım için ses kanalından ayrıldım.");
  }
};