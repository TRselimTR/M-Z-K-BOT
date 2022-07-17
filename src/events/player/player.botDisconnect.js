module.exports = {
  name: "botDisconnect",
  execute(bot, queue) {
    return bot.say.queueMessage(queue, "Ses kanalıyla bağlantım kesildiği için müzik durduruldu.", "RED");
  }
};