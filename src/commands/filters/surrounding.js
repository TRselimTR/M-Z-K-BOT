module.exports = {
  name: "surrounding",
  description: "Surrounding filtresini etkinleştirir..",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      surrounding: !queue.getFiltersEnabled().includes("surrounding")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("surrounding") ? "Uygulandı" : "Silindi"} Surrounding filtresi.`);
  }
};