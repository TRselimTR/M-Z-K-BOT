module.exports = {
  name: "error",
  execute(bot, queue, error) {
    bot.utils.sendErrorLog(bot, error, "error");

    return bot.say.queueMessage(queue, `Oynatma sırasında bir hata oluştu.\nNedeni: ${error.message}`, "RED");
  }
};