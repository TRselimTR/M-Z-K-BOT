module.exports = {
  name: "uptime",
  description: "Botun çalışma süresini gösterir",
  category: "utility",
  execute(bot, interaction) {
    const uptime = bot.utils.formatDuration(bot.uptime);

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor("Uptime Sürem", bot.user.displayAvatarURL())
      .setDescription(`${uptime}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] });
  }
};