const { EmbedBuilder } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./register-bot-src/db/db.json" });

module.exports = {

    name: "guildMemberAdd",

    async execute(member, client) {

        const kayitsizRol = db.get(`kayitsizRol_${member.guild.id}`);
        const kayitKanal = db.get(`kayitKanal_${member.guild.id}`);
        const yetkiliRol = db.get(`yetkiliRol_${member.guild.id}`);

        if(!kayitsizRol)return;
        if(!kayitKanal)return;
        if(!yetkiliRol)return;

        const welcomeEmbed = new EmbedBuilder()
        .setAuthor({ name: "Hoş geldin!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setColor("#fdfdfd")
        .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
        .setDescription(`**🆕 ${member} adlı kullanıcı sunucuya katıldı. \n\n 🛡️ Kayıt olman için <@&${yetkiliRol}> rolüne sahip yetkililer senle ilgilenecekler! \n\n ❤️ Seninle birlikte ` + "`" + `${member.guild.memberCount}` + "` kişi olduk. \n\n 🔔 Yetkilileri sabırla beklemen gerek. Lütfen yetkililere etiket atma!**")
        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()

        member.roles.add(kayitsizRol);
        client.channels.cache.get(kayitKanal).send({ embeds: [welcomeEmbed], content: `${member}, <@&${yetkiliRol}>` });

    },

};