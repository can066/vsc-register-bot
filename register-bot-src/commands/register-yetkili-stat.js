const { EmbedBuilder, Collection, PermissionFlagsBits } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./register-bot-src/db/db.json" });

module.exports = {

    name: "yetkili-stat",
    aliases: ["kayit-stat", "yetkili-bilgi", "kayit-bilgi"],

    async execute(client, message, args) {

        Collection.prototype.array = function() {
            return [...this.values()]
        };

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
        
        let sira = 1;
        let description = message.guild.members.cache.filter(mem => mem.roles.cache.has(yetkiliRol)).array().sort((a, b) => {
        return ((db.fetch(`kayitSayi_${b.user.id}_${message.guild.id}`) || 0) -(db.fetch(`kayitSayi_${a.user.id}_${message.guild.id}`) || 0));}).map(member => {
        return `\n\n **${sira++}.**  <@${member.user.id}> : **${db.fetch(`kayitSayi_${member.user.id}_${message.guild.id}`) || 0}** Kayıt sayısına sahip!`}) || "Sunucuya Ait Kayıt Bilgisi Bulunmamaktadır!"

        let statEmbed = new EmbedBuilder()
        .setAuthor({ name: `${message.guild.name} | Yetkili Bilgileri`, iconURL: `${message.guild.iconURL({ dynamic: true })}` })
        .setColor("#fdfdfd")
        .setDescription(`${description.toLocaleString() || "**Sunucuya Ait Kayıt Bilgisi Bulunmamaktadır!**"}`)
        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        message.reply({ embeds: [statEmbed] })
        

    },

};