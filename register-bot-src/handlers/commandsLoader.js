const { Collection } = require("discord.js");
const fs = require("fs");

module.exports = (client) => {

    client.prefixCommands = new Collection();
    client.prefixAliases = new Collection();

    const prefixCommands = fs.readdirSync("./register-bot-src/commands").filter(file => file.endsWith(".js"));

    for (file of prefixCommands) {

        const prefixCommand = require(`../commands/${file}`);

        client.prefixCommands.set(prefixCommand.name, prefixCommand);

        prefixCommand.aliases.forEach(alias => {
            client.prefixAliases.set(alias, prefixCommand.name);
        });

        console.log(`[KOMUT YÜKLENDİ!] ===> ${prefixCommand.name}`);

    };

};