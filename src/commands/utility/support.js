const { supportServer } = require("../../../config.json");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "destek",
  description: "Botun Destek Sunucusunu görürsün",
  category: "utility",
  execute(bot, interaction) {
    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[Destek sunucusuna katılmak için tıklayın.](${supportServer})`);

    const row = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Sunucu Link")
      .setStyle("LINK")
      .setURL(`${supportServer}`)
    ]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};