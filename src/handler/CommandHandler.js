const glob = require("glob");
const chalk = require('chalk')
module.exports = async function loadCommands(bot) {
  const commandFiles = glob.sync("./src/commands/**/*.js");

  bot.logger.info("COMMANDS", `${commandFiles.length} adet komut yükleniyor... (Bu biraz zaman alabilir)`)

  for await (const file of commandFiles) {
    const command = require(`../../${file}`);

    if (!command.name) {
      throw new TypeError(`[ERROR] komutlar için ad gereklidir! (${file})`);
    }

    if (!command.execute) {
      throw new TypeError(
        `[ERROR] komutlar için yürütme işlevi gereklidir! (${file})`
      );
    }

    if (!command.category) {
      bot.logger.warn("[COMMANDS]", `${command.name} adındaki komutta herhangi bir kategori ayarlanmadığından yardım komutunda komut gösterilmeyecektir.`);
    }

    const data = {
      name: command.name,
      description: command?.description ?? "Boş açıklama",
      options: command?.options ?? []
    };

    
    const cmd = bot.application?.commands.cache.find((c) => c.name === command.name);
    if (!cmd) {
      await bot.application?.commands.create(data);
    }

    // debug
    bot.logger.debug(`CMD DEBUG`, `Yükleniyor ${command.name}.js`);

    delete require.cache[require.resolve(`../../${file}`)];
    bot.commands.set(command.name, command);
  }
  
  console.log(chalk.green('[Bot AKTİF]') + chalk.cyan(' Creator: SeLiM#0001 - Kullandığın için teşekkür ederiz :)'))
  console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
  console.log(chalk.green('Bot: ') + chalk.cyan(`${bot.user.tag}`))
  console.log(chalk.green('Status: ') + chalk.cyan('Başlatıldı'))
  console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

};