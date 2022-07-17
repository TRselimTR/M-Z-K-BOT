module.exports = {
  name: "mono",
  description: "Mono  filtresini etkinleştirir.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      mono: !queue.getFiltersEnabled().includes("mono")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("mono") ? "Uygulandı" : "Silindi"} Mono Filtresi.`);
  }
};