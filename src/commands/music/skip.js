module.exports = {
  name: "geç",
  description: "Şuan Çalan Şarkıyı Geçersin",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1 && queue.repeatMode !== 3)
      return bot.say.warnMessage(interaction, "Sırada atlanacak başka şarkı yok.");

    queue.skip();

    return bot.say.successMessage(interaction, "Bir sonraki şarkıya geçildi.");
  }
};