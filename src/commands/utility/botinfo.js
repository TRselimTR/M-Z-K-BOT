const config = require("../../../config.json");
const { version: djsVersion, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "botinfo",
  description: "Bot hakkında bilgiler gösterir",
  category: "utility",
  async execute(bot, interaction) {
    const util = bot.utils;
    const uptime = util.formatDuration(bot.uptime);
    const createdAt = `<t:${bot.user.createdTimestamp}:R>`
    const users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor(`${bot.user.username}’in bilgileri`, bot.user.displayAvatarURL())
      .addField("Bilgi",
        `**Botun id'si:** ${bot.user.id}
        **Botun Tag'ı:** ${bot.user.tag}
        **Developer:** SeLiM#0001
        **Prefix:** \/ - Slash Komutlar`
      )
      .addField("Bot İstatistikleri",
        `**Kullanıcı Sayısı:** ${util.formatNumber(users)}
        **Sunucu Sayısı :** ${util.formatNumber(bot.guilds.cache.size)}
        **Kanal Sayısı:** ${util.formatNumber(bot.channels.cache.size)}
        **Komut Miktari:** ${util.formatNumber(bot.commands.size)}`
      )
      .addField("Sistem Bilgisi",
        `**RAM kullanımı:**  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
        **Bot Uptime Süresi:** ${uptime}
        **Node Versiyonu:** ${process.version}
        **Platform:** ${util.toCapitalize(process.platform)}`
      );

    const button1 = new MessageButton()
      .setLabel("Sunucu Daveti")
      .setStyle("LINK")
      .setURL(`${config.supportServer}`);


    const row = new MessageActionRow().addComponents([button1]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};
