module.exports = {
  name: "reverse",
  description: "Reverse filtresini etkinleştirir..",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Şu anda bir ses kanalında bulunmuyorum.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      reverse: !queue.getFiltersEnabled().includes("reverse")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("reverse") ? "Uygulandı" : "Silindi"} Reverse filtresi.`);
  }
};