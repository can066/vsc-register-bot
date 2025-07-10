const { EmbedBuilder } = require("discord.js");
const { prefix } = require("../../config.json");

module.exports = {

    name: "help",
    aliases: ["yardim", "yardım", "commands"],

    async execute(client, message, args) {

        const helpEmbed = new EmbedBuilder()
        .setAuthor({ name: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#fdfdfd")
        .addFields(
            { name: `${prefix}register-panel`, value: "Kayıt sistemini kuracağınız paneli açabilirsiniz." },
            { name: `${prefix}erkek / ${prefix}kadın`, value: "Üyeleri bu komutlar ile birlikte kayıt edebilirsiniz." },
            { name: `${prefix}kayıt-sayı`, value: "Etiketlediğiniz yetkilinin ya da kendinizin kayıt sayısını görebilirsiniz." },
            { name: `${prefix}yetkili-stat`, value: "Sunucunuzdaki yetkililerin kayıt bilgilerini görebilirsiniz." }
        )
        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        message.reply({ embeds: [helpEmbed] });

    },

};