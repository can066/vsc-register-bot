const { Client, Partials } = require("discord.js");
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: true,
    },
    partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.Guild, Partials.Member],
    intents: 53608447,
}); // Kendi client ayarlarınız ile değiştirebilirsiniz. - can066
const fs = require("fs");
const config = require("./config.json");
const express = require("express")
const app = express();

client.on("error", err => {
    console.log(err);
});

client.on("warn", warn => {
    console.log(warn);
});

client.login(config.token)

client.setMaxListeners(30); // Fazla event olduğunda botun uyarı vermesini engelliyoruz! - can066

app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString);
});

process.on("unhandledRejection", (err, promise) => {
    console.log("Unhandled Rejection at:", promise);
}); // 32 - 38 Satırları Botun Ufak Hatalarda Restart Yememesi İçindir! - can066

require("./register-bot-src/handlers/eventLoader.js")(client);