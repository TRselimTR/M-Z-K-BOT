module.exports = {
  name: "çal",
  description: "URL'den veya isimden bir şarkı veya çalma listesi çalarsın",
  category: "music",
  usage: "<şarkı url/isim>",
  options: [{
    name: "şarkı",
    description: "Çalmak istediğiniz şarkı adı/url'si.",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    try {

      if (!bot.utils.havePermissions(interaction))
        return bot.say.errorMessage(interaction, "**\`EMBED_LINKS\`** iznine ihtiyacım var.");

      const string = await interaction.options.getString("şarkı", true);

      const guildQueue = bot.player.getQueue(interaction.guild.id);

      const channel = interaction.member?.voice?.channel;

      if (!channel)
        return bot.say.warnMessage(interaction, "Önce ses kanalına girmelisin");

      if (guildQueue) {
        if (channel.id !== interaction.guild.me?.voice?.channelId)
          return bot.say.warnMessage(interaction, "Zaten farklı bir ses kanalında oynuyorum!");
      } else {
        if (!channel.viewable)
          return bot.say.warnMessage(interaction, "**\`VIEW_CHANNEL\`** iznine ihtiyacım var.");
        if (!channel.joinable)
          return bot.say.warnMessage(interaction, "**\`CONNECT_CHANNEL\`** iznine ihtiyacım var.");
        if (!channel.speakable)
          return bot.say.warnMessage(interaction, "**\`SPEAK\`** iznine ihtiyacım var.");
        if (channel.full)
          return bot.say.warnMessage(interaction, "Katılamıyorum, ses kanalı dolu.");
      }

      let result = await bot.player.search(string, { requestedBy: interaction.user }).catch(() => { });
      if (!result || !result.tracks.length)
        return bot.say.errorMessage(interaction, `\`${string}\` için sonuç bulunamadı.`);

      let queue;
      if (guildQueue) {
        queue = guildQueue;
        queue.metadata = interaction;
      } else {
        queue = await bot.player.createQueue(interaction.guild, {
          metadata: interaction
        });
      }

      try {
        if (!queue.connection) await queue.connect(channel);
      } catch (error) {
        bot.logger.error("JOIN", error);
        bot.player.deleteQueue(interaction.guild.id);
        return bot.say.errorMessage(interaction, `Ses kanalına katılamadım!\n\`${error}\``);
      }

      result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

      if (!queue.playing) await queue.play();
    } catch (e) {
      console.log(e)
    }
  }
};