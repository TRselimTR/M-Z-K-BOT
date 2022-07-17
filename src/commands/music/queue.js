module.exports = {
  name: "sıra",
  description: "Sırayı gösterir.",
  category: "music",
  options: [{
    name: "sayfa",
    description: "Sıranın sayfa numarasını girin",
    type: "NUMBER",
    required: false
  }],
  async execute(bot, interaction) {
    let page = (await interaction.options.getNumber("sayfa", false)) ?? 1;

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!queue.tracks.length)
      return bot.say.warnMessage(interaction, "Şu anda sırada şarkı yok.");

    const multiple = 10;

    const maxPages = Math.ceil(queue.tracks.length / multiple);

    if (page < 1 || page > maxPages) page = 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.tracks.slice(start, end);

    const embed = bot.say.baseEmbed(interaction)
      .setDescription(
        `${tracks.map((song, i) => 
        `${start + (++i)} - [${song.title}](${song.url}) ~ [${song.requestedBy.toString()}]`
        ).join("\n")}`
      )
      .setFooter(
        `Sayfa: ${page} Toplam Sayfa: ${maxPages} | Şarkı ${start + 1} ile ${end > queue.tracks.length ? `${queue.tracks.length}` : `${end}`} - ${queue.tracks.length}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      );

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};