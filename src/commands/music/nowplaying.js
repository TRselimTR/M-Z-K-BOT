module.exports = {
  name: "şuan",
  description: "Çalmakta olan şarkıyı gösterir.",
  category: "music",
  options: [{
    name: "index",
    type: "NUMBER",
    description: "Çalan Şarkının indexi",
    required: true
  }],
  async execute(bot, interaction) {
    let index = await interaction.options.getNumber("index", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.current)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    index = index - 1;

    if (!queue.tracks[index] || index > queue.tracks.length)
      return bot.say.errorMessage(interaction, "Seçtiğin Şarkı listede mevcut değil.");

    if(index == 0)
      return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);

    const song = queue.tracks[index]

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor("Çalıyor 🎵")
      .setTitle(`${song.title}`)
      .setURL(`${song.url}`)
      .setThumbnail(`${song.thumbnail}`)
      .setDescription(`İsteyen: ${song.requestedBy.toString()}
Sahip: ${song.author}
Süre: ${song.duration}
Sıra: ${index}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};