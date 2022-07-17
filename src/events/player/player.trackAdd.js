module.exports = {
  name: "trackAdd",
  execute(bot, queue, track) {
    if (!queue.playing || queue.tracks.length <= 0) return;

    const embed = bot.say.baseEmbed(queue)
      .setTitle(`Parça sıraya alındı - Sıra ${queue.tracks.indexOf(track) +1}`)
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`)
      .setImage(`${track.thumbnail}`)
      
    return queue.metadata.reply({ embeds: [embed] }).catch(console.error);
  }
};