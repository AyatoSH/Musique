const fs = require("fs");
const config = require("../config.json");

module.exports = {
  name: "pruning",
  description: "Basculer l'élagage des messages de bot",
  execute(message) {
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send(" Une erreur s'est produite lors de l'écriture dans le fichier.").catch(console.error);
      }

      return message.channel
        .send(`L'élagage des messages est ${config.PRUNING ? "**enabled**" : "**disabled**"}`)
        .catch(console.error);
    });
  }
};
