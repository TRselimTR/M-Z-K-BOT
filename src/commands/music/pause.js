module.exports = {
  name: "durdur",
  description: "Çalan şarkıyı Durdurur.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.connection.paused)
      return bot.say.warnMessage(interaction, "Şarkı zaten durdurulmuş.");

    queue.setPaused(true);

    return bot.say.successMessage(interaction, "Şarkı Durduruldu.");
  }
};