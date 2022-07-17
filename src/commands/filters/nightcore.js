module.exports = {
  name: "nightcore",
  description: "Nightcore filtresini etkinleştirir..",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      nightcore: !queue.getFiltersEnabled().includes("nightcore")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("nightcore") ? "Uygulandı" : "Silindi"} Nightcore Filtresi.`);
  }
};