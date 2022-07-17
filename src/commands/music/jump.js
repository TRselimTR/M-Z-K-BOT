module.exports = {
  name: "değiştir",
  description: "Belirlediğin şarkıya geçer",
  category: "music",
  usage: "değiştir <numara>",
  options: [{
    name: "numara",
    description: "atlamak istediğiniz şarkı",
    type: "NUMBER",
    required: true
  }],
  async execute(bot, interaction) {
    let index = await interaction.options.getNumber("numara", true);
    index = index - 1;

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.errorMessage(interaction, "Sırada şarkı yok.");

    if (index > queue.tracks.length || index < 0 || !queue.tracks[index])
      return bot.say.errorMessage(interaction, "Sırada bu kadar şarkı yok :d");

    queue.jump(index);

    return bot.say.successMessage(interaction, `\`${index}\` numaralı şarkıya atlandı.`);
  }
};