const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
  description: "Supprimer une musique dans la file d'attente",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Utilisation: ${message.client.prefix}remove <Numéro>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}remove <Numéro>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} :white_check_mark: **${song[0].title}** vient d'être retiré de la liste d'attente avec succès !`);
  }
};
