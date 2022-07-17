const { QueueRepeatMode } = require("discord-player");

module.exports = {
  name: "döngü",
  description: "Şarkıyı tekrarlama modunu seçersin (autoplay|track|queue|off)",
  category: "music",
  options: [
    {
      type: "SUB_COMMAND",
      name: "mode",
      description: "Ayarlanan döngü modunu gösterir."
    },
    {
      type: "SUB_COMMAND",
      name: "off",
      description: "Döngüyü kapatır"
    },
    {
      type: "SUB_COMMAND",
      name: "queue",
      description: "Sırayı döngüye alır (bütün şarkılar)"
    },
    {
      type: "SUB_COMMAND",
      name: "track",
      description: "Çalan şarkıyı tekrarlar"
    },
    {
      type: "SUB_COMMAND",
      name: "autoplay",
      description: "Sıra bitiminden sonra şarkıları otomatik oynatır"
    }
  ],
  async execute(bot, interaction) {
    const subCmd = await interaction.options.getSubcommand(true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    let mode;
    switch (subCmd) {
      case "off":
        queue.setRepeatMode(QueueRepeatMode.OFF);
        mode = "Döngü kapatıldı.";
        break;
      case "track":
        queue.setRepeatMode(QueueRepeatMode.TRACK);
        mode = "Şarkı Tekrarlama Aktif :)";
        break;
      case "queue":
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        mode = "Sırayı tekrarlama sistemi aktif";
        break;
      case "autoplay":
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
        mode = "Otomatik çalma modu aktif";
        break;
      default:
        let md = "none";
        if (queue.repeatMode === 3) {
          md = "autoplay";
        } else if (queue.repeatMode == 2) {
          md = "queue";
        } else if (queue.repeatMode == 1) {
          md = "track";
        } else if (queue.repeatMode == 0) {
          md = "off";
        }

        const embed = bot.say.baseEmbed(interaction)
          .setDescription(`Döngü modu \`${md}\` olarak ayarlandı.`)
          .setFooter(`Bu şekilde döngü modunu değiştirebilirsin: \'\/döngü <off|track|queue|autoplay>\'`);
        return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    }

    return bot.say.successMessage(interaction, `${mode}`);
  }
};