const config = require("../../config.json");
const logger = require("../modules/Logger");

function checkValid() {
  const nodeV = parseFloat(process.versions.node);
  const npmV = parseFloat(process.versions.node);

  if (nodeV < 16) {
    throw Error("[ERROR]: Bu bot, nodejs'nin 16.6 sürümünü gerektirir! Lütfen 16.6 veya daha fazla sürüme yükseltin.");
  }

  if (npmV < 7) {
    throw Error("[ERROR]: Lütfen npm'yi 7 veya daha fazla sürüme yükseltin.");
  }

  if (!config.botToken || config.botToken === "") {
    throw Error("[ERROR]: Bot Tokeni Girmen gerekiyor");
  }

  if (!config.supportServer || config.supportServer === "") {
    logger.warn("config", "Discord desteği için Destek Sunucusu girmen gereklidir.");
  }

  if (!config.owners[0]) {
    logger.warn("config", "OwnerId, yalnızca bot sahibi komutları için gereklidir.");
  }
}

checkValid();