module.exports = {
  name: "connectionCreate",
  execute(bot, queue, connection) {
    const embed = bot.say.baseEmbed(queue)
      .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL())
      .setDescription(`👍 ${connection.channel.toString()} kanalına katıldım ve 📄 ${queue.metadata.channel.toString()} adlı kanalda şarkı başlatıldı`);

    return queue.metadata.reply({ embeds: [embed] }).catch(console.error);
  }
};