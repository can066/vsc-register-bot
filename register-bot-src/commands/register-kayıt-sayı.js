const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./register-bot-src/db/db.json" });

module.exports = {

    name: "kayıt-sayı",
    aliases: ["kayit-sayi", "kayıt-sayi", "kayit-sayı"],

    async execute(client, message, args) {

        const erkekRol = db.get(`erkekRol_${message.guild.id}`);
        const kayitsizRol = db.get(`kayitsizRol_${message.guild.id}`);
        const yetkiliRol = db.get(`yetkiliRol_${message.guild.id}`);
        const kayitKanal = db.get(`kayitKanal_${message.guild.id}`);
        const logKanal = db.get(`logKanal_${message.guild.id}`);

        if(!erkekRol)return;
        if(!kayitsizRol)return;
        if(!yetkiliRol)return;
        if(!kayitKanal)return;
        if(!logKanal)return;

        const needPermission = new EmbedBuilder()
        .setAuthor({ name: "Hata!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#ff0000")
        .setDescription("**Bu komutu kullanabilmek için " + `<@&${yetkiliRol}> rolüne veya ` + "`Yönetici` iznine ihtiyacın var!**")
        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()
        
        if(!message.member.roles.cache.has(yetkiliRol) && !message.member.permissions.has(PermissionFlagsBits.Administrator))return message.reply({ embeds: [needPermission] });
        
        let target = message.mentions.members.first() || message.member;

        let count = db.get(`kayitSayi_${target.user.id}_${message.guild.id}`) || "0";

        const resultEmbed = new EmbedBuilder()
        .setAuthor({ name: `${target.user.username}`, iconURL: `${target.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#fdfdfd")
        .setDescription(`**Yetkiliye ait ` + "`" + `${count}` + "` kayıt sayısı bulunuyor.**")
        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        message.reply({ embeds: [resultEmbed] });

    },

};