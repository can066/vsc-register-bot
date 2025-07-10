const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./register-bot-src/db/db.json" });

module.exports = {

    name: "erkek",
    aliases: ["kayıt-erkek", "e", "register-erkek"],

    async execute(client, message, args) {

        const erkekRol = db.get(`erkekRol_${message.guild.id}`);
        const kayitsizRol = db.get(`kayitsizRol_${message.guild.id}`);
        const yetkiliRol = db.get(`yetkiliRol_${message.guild.id}`);
        const kayitKanal = db.get(`kayitKanal_${message.guild.id}`);
        const logKanal = db.get(`logKanal_${message.guild.id}`);
        const tag = db.get(`tag_${message.guild.id}`) || "";
        const count = db.get(`kayitSayi_${message.author.id}_${message.guild.id}`);

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

        let target = message.mentions.members.first();
        let name = args.slice(1).join(" ");

        const noTarget = new EmbedBuilder()
        .setAuthor({ name: "Hata!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#ff0000")
        .setDescription("**Bir üye etiketlemelisin. \n\n Örnek kullanım: `.e @Üye ISIM`**")
        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        const noName = new EmbedBuilder()
        .setAuthor({ name: "Hata!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#ff0000")
        .setDescription("**Bir isim girmelisin. \n\n Örnek kullanım: `.e @Üye ISIM`**")
        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        if(!target)return message.reply({ embeds: [noTarget] });
        if(!name)return message.reply({ embeds: [noName] });

        const successEmbed = new EmbedBuilder()
        .setAuthor({ name: "Kayıt Başarılı!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#008000")
        .setDescription(`**${target} Adlı kullanıcı başarıyla kaydedildi! \n\n *<@&${kayitsizRol}> Rolü alınıp, <@&${erkekRol}> rolü verildi.* \n\n ${message.member} Adlı yetkilinin kayıt sayısı ` + "`" + `${count + 1}` + "` oldu.**")
        .setFooter({ text: "discord.gg/vsc ❤️ can066", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        const logEmbed = new EmbedBuilder()
        .setAuthor({ name: "Kayıt Yapıldı", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#fdfdfd")
        .setThumbnail(`${target.user.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`**${target} Adlı kullanıcının kayıtı yapıldı! \n\n Kayıtı yapan yetkili: ${message.member} [${count + 1}]**`)
        .setFooter({ text: "discord.gg/vsc ❤️ can066", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        db.add(`kayitSayi_${message.author.id}_${message.guild.id}`, +1)
        target.roles.remove(kayitsizRol);
        target.roles.add(erkekRol);
        target.setNickname(`${tag} ${name}`)
        message.reply({ embeds: [successEmbed] });
        client.channels.cache.get(logKanal).send({ embeds: [logEmbed] });

    },

};