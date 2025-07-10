const { Client, Partials, ActivityType } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
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
const config = require("./../../config.json");

module.exports = {

    name: "ready",

    async execute(client) {

        require("./../handlers/commandsLoader.js")(client);

        console.log(`"${client.user.username}" Adlı bot başarı ile giriş yaptı!`);
        console.log(`discord.gg/vsc ❤️ can066`)

        client.user.setPresence({ activities: [{ name: "discord.gg/vsc ❤️ can066", type: ActivityType.Watching }], status: "online" })

        const channel = client.channels.cache.get(config.voiceChannel);

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

    },

};