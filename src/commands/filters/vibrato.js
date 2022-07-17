module.exports = {
  name: "vibrato",
  description: "Vibrato filtresini etkinleştirir..",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      vibrato: !queue.getFiltersEnabled().includes("vibrato")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("vibrato") ? "Uygulandı" : "Silindi"} Vibrato filtresi.`);
  }
};