const { canModifyQueue } = require("../util/EvobotUtil");


module.exports = {
  name: "stop",
  description: "Arrêter la musique",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply(":x: | Désolé, Il n'y a aucune musique en cours de lecture.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} :white_check_mark: | vient d'arrêter la musique avec succès !`).catch(console.error);
  }
};
