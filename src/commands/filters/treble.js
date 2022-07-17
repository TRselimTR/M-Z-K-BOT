module.exports = {
  name: "treble",
  description: "Treble filtresini etkinleştirir.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      treble: !queue.getFiltersEnabled().includes("treble")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("treble") ? "Uygulandı" : "Silindi"} Treble filtresi.`);
  }
};