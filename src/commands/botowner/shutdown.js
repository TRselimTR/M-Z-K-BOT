module.exports = {
  name: "botukapat",
  description: "Botu kapatır",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, interaction) {
    await bot.say.successMessage(interaction, "Bot kapatılıyooorr......", true);

    process.exit(1);
  }
};