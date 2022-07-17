module.exports = {
  name: "connectionError",
  execute(bot, queue, error) {
    bot.utils.sendErrorLog(bot, error, "error");

    return bot.say.queueMessage(queue, `Kanala Bağlantı sırasında bir hata oluştu.\nNedeni: ${error.message}`, "RED");
  }
};