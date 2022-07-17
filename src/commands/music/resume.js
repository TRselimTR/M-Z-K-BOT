module.exports = {
  name: "devam",
  description: "Duraklatılmış şarkıyı devam ettirir.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (!queue.connection.paused)
      return bot.say.warnMessage(interaction, "Şarkı zaten devam ediyor.");

    queue.setPaused(false);

    return bot.say.successMessage(interaction, "Şarkıya devam ediyor.");
  }
};