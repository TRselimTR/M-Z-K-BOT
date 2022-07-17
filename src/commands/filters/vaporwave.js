module.exports = {
  name: "vaporwave",
  description: "Vaporwave filtresini etkinleştirir..",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      vaporwave: !queue.getFiltersEnabled().includes("vaporwave")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("vaporwave") ? "Uygulandı" : "Silindi"}  vaporvawe filtresi`);
  }
};