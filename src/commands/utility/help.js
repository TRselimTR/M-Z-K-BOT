const catDetails = require("../../data/categoryDetails.json");
const categories = require("../../data/categories.json");
const config = require("../../../config.json");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "yardım",
  description: "Yardım Menüsünü Gösteriri",
  category: "utility",
  options: [{
    name: "komut",
    type: "STRING",
    description: "Aradığın komut",
    required: false
  }],
  execute(bot, interaction) {
    const arg = interaction.options.getString("komut", false);

    if (arg) {
      const cmd = bot.commands.get(arg);
      if (!cmd)
        return bot.say.warnMessage(interaction, `Aradığın \`${arg}\` adında bir komut bulunamadı .`);

      const cmdUsage = cmd.usage ? `\/${cmd.name} ${cmd.usage}` : `\/${cmd.name}`;

      const embed = bot.say.baseEmbed(interaction)
        .setAuthor(`${cmd.category} Komut: ${cmd.name}`, bot.user.displayAvatarURL())
        .addField(`${cmdUsage}`, `${cmd.description ?? "Belirtilmemiş"}`)
        .setFooter("[] : isteğe bağlı • <> : zorunlu • | : yada");

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }

    const cates = [];
    for (let i = 0; i < categories.length; i++) {
      const category = bot.commands.filter(({ category }) => category === categories[i])
        .map(({ name }) => name);
      cates.push(category);
    }

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor({name: "Yardım Komutları", iconURL: bot.user.displayAvatarURL()})
      .setFooter(`Bir komutla ilgili daha fazla ayrıntı için '\/help <komutadı>' yazın`);

    for (let j = 0; j < cates.length; j++) {
      const name = catDetails[categories[j]];

      if (categories[j] === "botowner" && !config.owners.includes(interaction.user.id)) continue;

      embed.addField(`${name}`, `\`\`\`${cates[j].join(", ")}\`\`\``);
    };

    const button1 = new MessageButton()
      .setLabel("Destek")
      .setStyle("LINK")
      .setURL(`${config.supportServer}`);
      
    const row = new MessageActionRow().addComponents([button1]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};