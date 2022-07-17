module.exports = {
  name: "subboost",
  description: "Subboost filtresini etkinleştirir..",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      subboost: !queue.getFiltersEnabled().includes("subboost")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("subboost") ? "Applied" : "Removed"} Subboost filtresi.`);
  }
};