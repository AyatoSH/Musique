const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Reprendre la lecture de la musique en cours",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply(":x: | Désolé, Aucune musique n'est en cours de lecture.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} :white_check_mark: | a repris la musique avec succès !`).catch(console.error);
    }

    return message.reply(" La file d'attente n'est pas mise en pause.").catch(console.error);
  }
};
