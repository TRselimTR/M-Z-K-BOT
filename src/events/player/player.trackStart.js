const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "trackStart",
  execute(bot, queue, track) {
    if (!bot.utils.havePermissions(queue.metadata.channel)) return;

    const embed = bot.say.baseEmbed(queue)
      .setTitle("🎶 Şimdi Çalıyor")
      .setDescription(`[${track.title}](${track.url})`)
      .setImage(`${track.thumbnail}`)
      .addFields(
        { name: "İsteyen:", value: `[${track.requestedBy.toString()}]`, inline: true },
        { name: "Sıra:", value: ``, inline: true },
        { name: "Yayınlayan" , value: `${track.author}`, inline: true},
        { name: "İzlenme" , value: `${track.views}`, inline: true},
        { name: "Süre" , value: `${track.duration}`, inline: true},
      )

    return queue.metadata.channel.send({ embeds: [embed] });
  }
};