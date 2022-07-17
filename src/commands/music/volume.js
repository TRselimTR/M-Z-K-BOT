module.exports = {
  name: "ses",
  description: "Ses seviyesini kontrol ederin veya değiştirirsin",
  category: "music",
  options: [{
    name: "miktar",
    description: "Botun ses seviyesini değiştirir",
    type: "NUMBER",
    required: false
  }],
  async execute(bot, interaction) {
    const newVol = await interaction.options.getNumber("miktar", false);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (!newVol) {
      const embed = bot.say.baseEmbed(interaction)
        .setDescription(`Ses seviyesi \`${queue.volume}%\`.`)
        .setFooter(`Sesi seviyesini değiştirmek için \'\/volume <1-200>\' kullanabilirsin.`);

      return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    }

    if (!Number.isInteger(newVol) || newVol >= 200 || newVol <= 0)
      return bot.say.warnMessage(interaction, " 1 ile 200 arasında geçerli bir sayı girin.");

    queue.setVolume(newVol);

    return bot.say.successMessage(interaction, `Ses Yükseltildin\Ses seviyesi: \`${await queue.volume}%\`.`);
  }
};
