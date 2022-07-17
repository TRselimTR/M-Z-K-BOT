module.exports = {
  name: "karaoke",
  description: "Karaoke filtresini etkinleştirir.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      kakaoke: !queue.getFiltersEnabled().includes("karaoke")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("karaoke") ? "Uygulandı" : "Silindi"} Karaoke Filtresi.`);
  }
};