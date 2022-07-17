const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init();

module.exports = {
  name: "lyrics",
  description: "Şarkı Sözlerini Gösterir",
  usage: "[ŞarkıAdı]",
  category: "music",
  options: [{
    type: "STRING",
    name: "ara",
    description: "Şarkı sözü aramak için şarkı adı giriniz",
    required: false
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const queue = bot.player.getQueue(interaction.guild.id);

    const query = interaction.options.getString("ara", false) ?? queue?.current?.title;

    if (!query)
      return bot.say.errorMessage(interaction, "Şarkı adını girmeyi unutmuşsun.");

    const queryFormated = query
      .toLowerCase()
      .replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g, "");

    const result = await lyricsClient.search(`${queryFormated}`);

    if (!result || !result.lyrics)
      return bot.say.errorMessage(interaction, "Bu şarkıya ait şarkı sözü bulunamadı.");

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`${query}`)
      .setDescription(`${result.lyrics.slice(0, 4090)}...`);

    return interaction.editReply({ embeds: [embed] }).catch(console.error);
  }
};