const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "birlikteizle",
  description: "Birlikte bir youtube izleme etkinliği için sesli oturum başlatır.",
  category: "activity",
  options: [
    {
      type: "CHANNEL",
      name: "kanal",
      description: "Ses kanalından bahsedin. (default: Bulunduğun ses kanalını seçer)",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const channel = (await interaction.options.getChannel("kanal", false)) ?? interaction.member?.voice?.channel;

    if (!channel)
      return bot.say.warnMessage(interaction, "Bir ses kanalına katılmanız veya bahsetmeniz gerekir.");

    if (!channel.viewable)
      return bot.say.warnMessage(interaction, "\`Kanalı Görüntüle\` iznine ihtiyacım var.");

    if (channel.type !== "GUILD_VOICE")
      return bot.say.warnMessage(interaction, "Geçerli bir ses kanalı gir.");

    if (!channel.permissionsFor(interaction.guild.me)?.has(1n))
      return bot.say.warnMessage(interaction, "\`Davet Oluştur\` iznine ihtiyacım var.");

    const invite = await channel.createInvite({
      targetApplication: "755600276941176913",
      targetType: 2
    });

    const embed = bot.say.baseEmbed(interaction)
      .setTitle(`**YouTube Birlikte İzle** etkinliğini **${channel.name}** kanalına başarıyla kurdu.`);

    const btnRow = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Join")
      .setStyle("LINK")
      .setURL(`${invite.url}`)
      ]);

    return interaction.reply({ embeds: [embed], components: [btnRow] }).catch(console.error);
  }
};