module.exports = {
  name: "pulsator",
  description: "Pulsator filtresini etkinleştirir..",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      pulsator: !queue.getFiltersEnabled().includes("pulsator")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("pulsator") ? "Uygulandı" : "Silindi"} Pulsator filtresi.`);
  }
};