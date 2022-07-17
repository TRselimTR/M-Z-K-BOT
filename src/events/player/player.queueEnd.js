module.exports = {
  name: "queueEnd",
  execute(bot, queue) {
    return bot.say.queueMessage(queue, "Sırada Çalınacak başka şarkı yok. Bu yüzden Ses kanalından ayrıldım.");
  }
};