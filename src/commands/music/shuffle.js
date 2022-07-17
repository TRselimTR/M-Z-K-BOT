module.exports = {
  name: "karıştır",
  description: "Sırayı karıştırır.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 3)
      return bot.say.warnMessage(interaction, "Karıştırmak için sırada en az \`3\` şarkı olması gerekiyor.");

    queue.shuffle();

    return bot.say.successMessage(interaction, "Sıra karıştırıldı.");
  }
};