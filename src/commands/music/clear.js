module.exports = {
  name: "sırayı-sil",
  description: "Sırada olan şarkıları gösterir",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.warnMessage(interaction, "Şu anda sırada bir şarkı yok.");

    queue.clear();

    return bot.say.successMessage(interaction, "Sıra Temizlendi");
  }
};