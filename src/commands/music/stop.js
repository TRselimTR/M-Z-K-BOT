module.exports = {
  name: "kapat",
  description: "Şarkıyı kapatır.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    queue.stop();

    return bot.say.successMessage(interaction, "Şarkı kapatıldı.");
  }
};