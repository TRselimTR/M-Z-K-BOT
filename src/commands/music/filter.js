module.exports = {
  name: "filtre",
  description: "Müziklerde kullabılabilecek olan filtreleri gösterir",
  category: "music",
  options: [
    {
      type: "SUB_COMMAND",
      name: "temizle",
      description: "Filtreleri temizler"
    },
    {
      type: "SUB_COMMAND",
      name: "göster",
      description: "Filtreleri gösterir"
    }
  ],
  async execute(bot, interaction) {
    const subCmd = await interaction.options.getSubcommand(true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    const filters = queue.getFiltersEnabled();


    if (subCmd === "temizle") {
      if (!filters.length)
        return bot.say.warnMessage(interaction, "Şu anda hiçbir filtre aktif değil..");

      queue.setFilters({});

      return bot.say.successMessage(interaction, "Bütün Filtreler temizlendi");
      
    } else {
      const enabledFilters = queue.getFiltersDisabled();
      const disabledFilters = queue.getFiltersDisabled();

      const enFDes = enabledFilters.map((f) => `**${bot.utils.toCapitalize(f)}** --> ✅`).join("\n");

      const disFDes = disabledFilters.map((f) => `**${bot.utils.toCapitalize(f)}** --> ❌`).join("\n");

      const embed = bot.say.baseEmbed(interaction)
        .setTitle("Filtreler")
        .setDescription(`${enFDes}\n\n${disFDes}`);

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }
  }
};