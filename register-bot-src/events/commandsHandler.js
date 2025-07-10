const config = require("../../config.json");

module.exports = {

    name: "messageCreate",

    async execute(message, client) {

        if(!message.guild)return;
        if(message.author.bot)return;
        let prefix = config.prefix;
        if(!message.content.startsWith(prefix))return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        let cmd;

        if(client.prefixCommands.has(command)) {
            cmd = client.prefixCommands.get(command);
        } else if(client.prefixAliases.has(command)) {
            cmd = client.prefixCommands.get(client.prefixAliases.get(command));
        };

        if(cmd) {

            try {
                cmd.execute(client, message, args);
            } catch(err) {
                console.log(`${command} Kullanılırken hata oluştu!`, err);
            }

        };

    },

};