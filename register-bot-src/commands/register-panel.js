const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits, ButtonStyle } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./register-bot-src/db/db.json" });

module.exports = {

    name: "register-panel",
    aliases: ["setup-panel", "kayit-panel", "panel"],

    async execute(client, message, args) {

        const needPermission = new EmbedBuilder()
        .setAuthor({ name: "Hata!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#ff0000")
        .setDescription("**Bu komutu kullanabilmek için `Yönetici` iznine ihtiyacın var!**")
        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        if(!message.member.permissions.has(PermissionFlagsBits.Administrator))return message.reply({ embeds: [needPermission] });

        const setupEmbed = new EmbedBuilder()
        .setAuthor({ name: `Kayıt Kurulum Menüsü`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#fdfdfd")
        .setDescription("**Aşağıdaki `Kurulum` butonuna basarak kayıt sistemini kurabilirsiniz.** \n\n ** *Kurulum için herhangi bir süreniz bulunmamaktadır. İstediğiniz anda bırakıp tekrardan devam edebilirsiniz.* **")
        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        const setupRow = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
            .setCustomId("start-setup")
            .setStyle(ButtonStyle.Primary)
            .setLabel("Kurulum")
            .setEmoji("⚙️")

        );

        message.reply({ embeds: [setupEmbed], components: [setupRow] });

    },

};