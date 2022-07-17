module.exports = {
  name: "sil",
  description: "Sıradan belirlediğin şarkıyı kaldırır",
  usage: "<trackIndex>",
  category: "music",
  options: [{
    name: "index",
    description: "Kaldırılacak şarkı numarası",
    type: "NUMBER",
    required: true
  }],
  async execute(bot, interaction) {
    let index = await interaction.options.getNumber("index", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.warnMessage(interaction, "Sırada kaldırılacak şarkı yok.");

    index = index - 1;

    if (index < 0 || index > queue.tracks.length || !queue.tracks[index])
      return bot.say.warnMessage(interaction, "Sırada bu kadar yok :d");

    queue.remove(index);

    return bot.say.successMessage(interaction, `\`${index}\` Sıradan Silindi.`);
  }
};