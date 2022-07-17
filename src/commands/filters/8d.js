module.exports = {
  name: "8d",
  description: "8D filtresini etkinleştirir.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      "8D": !queue.getFiltersEnabled().includes("8D")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("8D") ? "Uygulandı" : "Silidmi"} 8D filtresi.`);
  }
};