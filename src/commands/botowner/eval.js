const { codeBlock } = require("@discordjs/builders");
const { inspect } = require("util");

module.exports = {
  name: "eval",
  description: "Bir parça javascript kodu yürütün",
  category: "botowner",
  ownerOnly: true,
  usage: "<code>",
  options: [{
    name: "code",
    description: "Çalıştırmak istediğiniz kod",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    await interaction.deferReply({ ephemeral: true });

    const code = interaction.options.getString("code", true);

    try {
      let evaled = await eval(code);

      const type = typeof evaled;
      evaled = inspect(evaled, {
        depth: 0,
        maxArrayLength: null
      });

      if (type === "object") evaled = JSON.stringify(evaled);

      const embed1 = bot.say.baseEmbed(interaction)
        .setTitle("Eval Komut")
        .setDescription(`Eval tipi: \`${type}\``);

      const embed2 = bot.say.baseEmbed(interaction)
        .setTitle("Eval Giriş")
        .setDescription(`${codeBlock("js", code)}`);

      const embed3 = bot.say.baseEmbed(interaction)
        .setTitle("Eval Çıkış")
        .setDescription(`${codeBlock("js", evaled)}`);

      return interaction.editReply({ embeds: [embed1, embed2, embed3] });
    } catch (error) {
      const err = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";

      const wrEmbed = bot.say.baseEmbed(interaction)
        .setTitle("Bir şeyler yanlış gitti")
        .setDescription(codeBlock(clean(err)));

      return interaction.editReply({ embeds: [wrEmbed] });
    }
  }
};

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}