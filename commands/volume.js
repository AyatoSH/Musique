const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Changer le volume de la musique",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply(":x: | Désolé, Il n'y a aucune musique en cours de lecture.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply(":x: | Désolé, Vous devez rejoindre un salon vocal avant d'effectuer cette action.").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Le volume de la musique est actuellement a: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply(":x: | Désolé, Veuillez saisir un chiffre pour modifier le volume.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply(":x: | Désolé, Veuillez utiliser un chiffre entre 1 & 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`:white_check_mark: | Le volume a été modifier par : **${args[0]}%**`).catch(console.error);
  }
};
