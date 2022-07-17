module.exports = {
  name: "atla",
  description: "Şarkıyı belirlediğin süreye sarar",
  usage: "<01:15>",
  category: "music",
  options: [{
    name: "süre",
    description: "Atlanacak süreyi gir örn: <01:15>",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    let timeString = interaction.options.getString("süre", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    const song = queue.current;

    if (song.live)
      return bot.say.warnMessage(interaction, "Bu şarkı canlı olarak çalıyor, atlayamazsın");

    if (isNaN(timeString) && !timeString.includes(":"))
      return bot.say.errorMessage(interaction, "Atlamak için geçerli bir süre gir Örn: 01:15");

    if (!isNaN(timeString)) timeString = `00:${timeString}`;

    const time = bot.utils.toMilliseconds(timeString);

    if (!time || isNaN(time) || time > song.durationMS || time < 0)
      return bot.say.warnMessage(interaction, "Atlamak için geçerli bir süre gir");

    queue.seek(time);

    return bot.say.successMessage(interaction, `\`${timeString}\` Süresine atlandı.`);
  }
};
