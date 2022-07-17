module.exports = {
  name: "tracksAdd",
  execute(bot, queue, tracks) {
    return bot.say.queueMessage(queue, `${tracks.length} adlı parça sıraya alındı.`);
  }
};