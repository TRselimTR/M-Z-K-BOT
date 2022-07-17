const glob = require("glob");

module.exports = function loadEvents(bot) {
  const eventFiles = glob.sync("./src/events/**/*.js");
  bot.logger.info("EVENTS", `${eventFiles.length} eventler yükleniyor...`);
  
  eventFiles.forEach((file) => {
    const event = require(`../../${file}`);

    let type = "bot";
    if (file.includes("player.")) type = "player";

    if (!event.execute) {
      throw new TypeError(`[ERROR] eventsler için yürütme işlevi gereklidir! (${file})`);
    }

    if (!event.name) {
      throw new TypeError(`[ERROR] evetsler için ad gereklidir! (${file})`);
    }

    
    if (type === "player") {
      bot.player.on(event.name, event.execute.bind(null, bot));
    } else if (event.once) {
      bot.once(event.name, event.execute.bind(null, bot));
    } else {
      bot.on(event.name, event.execute.bind(null, bot));
    }

    delete require.cache[require.resolve(`../../${file}`)];

    // debug
    bot.logger.debug(`EVT DEBUG`, `${event.name}.js Yükleniyor`);

  });
};