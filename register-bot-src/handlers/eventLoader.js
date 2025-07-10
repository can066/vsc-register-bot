const fs = require("fs");

module.exports = (client) => {

    const eventFiles = fs.readdirSync("./register-bot-src/events").filter(file => file.endsWith(".js"));

    for (file of eventFiles) {

        const event = require(`../events/${file}`);

        client.on(event.name, (...args) => event.execute(...args, client));

        console.log(`[EVENT YÜKLENDİ] ===> ${event.name}`)

    };

};