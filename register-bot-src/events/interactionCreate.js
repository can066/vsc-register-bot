const { InteractionType, PermissionFlagsBits, MessageFlags, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, RoleSelectMenuBuilder, ComponentType, ChannelSelectMenuBuilder, ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./register-bot-src/db/db.json" });

module.exports = {

    name: "interactionCreate",

    async execute(interaction, client) {

        if(interaction.type === InteractionType.MessageComponent) {

            if(interaction.customId === "start-setup") {

                const needPermission = new EmbedBuilder()
                .setAuthor({ name: "Hata!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                .setColor("#ff0000")
                .setDescription("**Bu butonu kullanabilmek için `Yönetici` iznine ihtiyacın var!**")
                .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                .setTimestamp()

                if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator))return interaction.reply({ embeds: [needPermission], flags: MessageFlags.Ephemeral });

                const selectComponentEmbed = new EmbedBuilder()
                .setAuthor({ name: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                .setColor("#fdfdfd")
                .setDescription("**Aşağıdaki menü üzerinden ayarlamak istediğiniz bileşeni seçiniz.**")
                .setFooter({ text: "discord.gg/vsc ❤️ can066", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                .setTimestamp()

                const selectComponentRow = new ActionRowBuilder()
                .addComponents(

                    new StringSelectMenuBuilder()
                    .setCustomId("select-component")
                    .setPlaceholder("Ayarlamak istediğiniz bileşeni seçin.")
                    .setMaxValues(1)
                    .addOptions(
                        { label: "Ayarlar", value: "ayarlar", description: "Sistemde kayıtlı olan ayarları görebilirsiniz.", emoji: "⚙️" },
                        { label: "Erkek Rolü", value: "erkek-rol", description: "Kayıt yapıldıktan sonra verilecek olan erkek rolü.", emoji: "♂️" },
                        { label: "Kadın Rolü", value: "kadin-rol", description: "Kayıt yapıldıktan sonra verilecek olan kadın rolü.", emoji: "♀️" },
                        { label: "Kayıtsız Rolü", value: "kayitsiz-rol", description: "Sunucuya giren kişilere kayıttan önce verilecek rol.", emoji: "🆕" },
                        { label: "Yetkili Rolü", value: "yetkili-rol", description: "Sunucuya giren kişileri kaydedecek yetkili rolü.", emoji: "🛡️" },
                        { label: "Kayıt Kanalı", value: "kayit-kanali", description: "Sunucuya giren kişilere karşılama mesajı atılacak kanal.", emoji: "📩" },
                        { label: "Log Kanalı", value: "log-kanali", description: "Yapılan kayıtların tutulacağı kanal.", emoji: "📜" },
                        { label: "Tag", value: "tag", description: "Sunucunuzda kullanılan tag.", emoji: "👑" },
                        { label: "Sistemi Sıfırla", value: "delete", description: "Kayıt sistemini verileriyle birlikte silersiniz.", emoji: "🗑️" }
                    )

                );

                interaction.reply({ embeds: [selectComponentEmbed], components: [selectComponentRow], flags: MessageFlags.Ephemeral });

            };

            if(interaction.customId === "select-component") {

                if(interaction.values[0] === "ayarlar") {

                    let erkekRol;
                    let getErkekRol = db.get(`erkekRol_${interaction.guild.id}`);
                    if(getErkekRol) erkekRol = `<@&${getErkekRol}>`;
                    if(!getErkekRol) erkekRol = "**`Ayarlanmamış!`**"

                    let kadinRol;
                    let getKadinRol = db.get(`kadinRol_${interaction.guild.id}`);
                    if(getKadinRol) kadinRol = `<@&${getKadinRol}>`;
                    if(!getKadinRol) kadinRol = "**`Ayarlanmamış!`**"

                    let kayitsizRol;
                    let getKayitsizRol = db.get(`kayitsizRol_${interaction.guild.id}`);
                    if(getKayitsizRol) kayitsizRol = `<@&${getKayitsizRol}>`;
                    if(!getKayitsizRol) kayitsizRol = "**`Ayarlanmamış!`**"

                    let yetkiliRol;
                    let getYetkiliRol = db.get(`yetkiliRol_${interaction.guild.id}`);
                    if(getYetkiliRol) yetkiliRol = `<@&${getYetkiliRol}>`;
                    if(!getYetkiliRol) yetkiliRol = "**`Ayarlanmamış!`**"

                    let kayitKanali;
                    let getKayitKanal = db.get(`kayitKanal_${interaction.guild.id}`);
                    if(getKayitKanal) kayitKanali = `<#${getKayitKanal}>`;
                    if(!getKayitKanal) kayitKanali = "**`Ayarlanmamış!`**"

                    let logKanali;
                    let getLogKanal = db.get(`logKanal_${interaction.guild.id}`);
                    if(getLogKanal) logKanali = `<#${getLogKanal}>`;
                    if(!getLogKanal) logKanali = "**`Ayarlanmamış!`**"

                    let tag;
                    let getTag = db.get(`tag_${interaction.guild.id}`);
                    if(getTag) tag = "`" + `${getTag}` + "`";
                    if(!getTag) tag = "**`Ayarlanmamış!`**"

                    const settingsEmbed = new EmbedBuilder()
                    .setAuthor({ name: "Kayıt Ayarları", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                    .setColor("#fdfdfd")
                    .addFields(
                        { name: "Erkek Rolü", value: `${erkekRol}` },
                        { name: "Kadın Rolü", value: `${kadinRol}` },
                        { name: "Kayıtsız Rolü", value: `${kayitsizRol}` },
                        { name: "Yetkili Rolü", value: `${yetkiliRol}` },
                        { name: "Kayıt Kanalı", value: `${kayitKanali}` },
                        { name: "Log Kanalı", value: `${logKanali}` },
                        { name: "Tag", value: `${tag}` },
                    )
                    .setFooter({ text: "discord.gg/vsc ❤️ can066", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                    .setTimestamp()

                    interaction.reply({ embeds: [settingsEmbed], flags: MessageFlags.Ephemeral });

                };

                if(interaction.values[0] === "erkek-rol") {

                    const roleSelectRow = new ActionRowBuilder()
                    .addComponents(

                        new RoleSelectMenuBuilder()
                        .setCustomId("erkek-rol-select")
                        .setMaxValues(1)
                        .setPlaceholder("Bir rol seçin.")
                    

                    );

                    interaction.reply({ content: "**Aşağıdaki menü üzerinden bir rol seçin. Rol seçmek için `30 saniyeniz` var!**", components: [roleSelectRow], flags: MessageFlags.Ephemeral }).then(async (msg) => {

                    const collector = await interaction.channel.createMessageComponentCollector({ max: 1, time: 30000, component_Type: ComponentType.RoleSelect });

                        collector.on("collect", async (menu) => {

                            if(menu.values === undefined || !menu.values || !menu.values[0])return;

                            db.set(`erkekRol_${interaction.guild.id}`, menu.values[0])

                            const successEmbed = new EmbedBuilder()
                            .setAuthor({ name: "Başarılı!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setColor("#008000")
                            .setDescription(`**Sistemdeki erkek rolü başarı ile <@&${menu.values[0]}> olarak ayarlandı!**`)
                            .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setTimestamp()

                            menu.reply({ embeds: [successEmbed], flags: MessageFlags.Ephemeral });

                        });

                        collector.on("end", (collected) => {

                            if(collected.size < 1)return;

                        });

                    });

                };

                if(interaction.values[0] === "kadin-rol") {

                    const roleSelectRow = new ActionRowBuilder()
                    .addComponents(

                        new RoleSelectMenuBuilder()
                        .setCustomId("kadin-rol-select")
                        .setMaxValues(1)
                        .setPlaceholder("Bir rol seçin.")
                    

                    );

                    interaction.reply({ content: "**Aşağıdaki menü üzerinden bir rol seçin. Rol seçmek için `30 saniyeniz` var!**", components: [roleSelectRow], flags: MessageFlags.Ephemeral }).then(async (msg) => {

                    const collector = await interaction.channel.createMessageComponentCollector({ max: 1, time: 30000, component_Type: ComponentType.RoleSelect });

                        collector.on("collect", async (menu) => {

                            if(menu.values === undefined || !menu.values || !menu.values[0])return;

                            db.set(`kadinRol_${interaction.guild.id}`, menu.values[0])

                            const successEmbed = new EmbedBuilder()
                            .setAuthor({ name: "Başarılı!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setColor("#008000")
                            .setDescription(`**Sistemdeki kadın rolü başarı ile <@&${menu.values[0]}> olarak ayarlandı!**`)
                            .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setTimestamp()

                            menu.reply({ embeds: [successEmbed], flags: MessageFlags.Ephemeral });

                        });

                        collector.on("end", (collected) => {

                            if(collected.size < 1)return;

                        });

                    });

                };

                if(interaction.values[0] === "kayitsiz-rol") {

                    const roleSelectRow = new ActionRowBuilder()
                    .addComponents(

                        new RoleSelectMenuBuilder()
                        .setCustomId("kayitsiz-rol-select")
                        .setMaxValues(1)
                        .setPlaceholder("Bir rol seçin.")
                    

                    );

                    interaction.reply({ content: "**Aşağıdaki menü üzerinden bir rol seçin. Rol seçmek için `30 saniyeniz` var!**", components: [roleSelectRow], flags: MessageFlags.Ephemeral }).then(async (msg) => {

                    const collector = await interaction.channel.createMessageComponentCollector({ max: 1, time: 30000, component_Type: ComponentType.RoleSelect });

                        collector.on("collect", async (menu) => {

                            if(menu.values === undefined || !menu.values || !menu.values[0])return;

                            db.set(`kayitsizRol_${interaction.guild.id}`, menu.values[0])

                            const successEmbed = new EmbedBuilder()
                            .setAuthor({ name: "Başarılı!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setColor("#008000")
                            .setDescription(`**Sistemdeki kayıtsız rolü başarı ile <@&${menu.values[0]}> olarak ayarlandı!**`)
                            .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setTimestamp()

                            menu.reply({ embeds: [successEmbed], flags: MessageFlags.Ephemeral });

                        });

                        collector.on("end", (collected) => {

                            if(collected.size < 1)return;

                        });

                    });

                };

                if(interaction.values[0] === "yetkili-rol") {

                    const roleSelectRow = new ActionRowBuilder()
                    .addComponents(

                        new RoleSelectMenuBuilder()
                        .setCustomId("yetkili-rol-select")
                        .setMaxValues(1)
                        .setPlaceholder("Bir rol seçin.")
                    

                    );

                    interaction.reply({ content: "**Aşağıdaki menü üzerinden bir rol seçin. Rol seçmek için `30 saniyeniz` var!**", components: [roleSelectRow], flags: MessageFlags.Ephemeral }).then(async (msg) => {

                    const collector = await interaction.channel.createMessageComponentCollector({ max: 1, time: 30000, component_Type: ComponentType.RoleSelect });

                        collector.on("collect", async (menu) => {

                            if(menu.values === undefined || !menu.values || !menu.values[0])return;

                            db.set(`yetkiliRol_${interaction.guild.id}`, menu.values[0])

                            const successEmbed = new EmbedBuilder()
                            .setAuthor({ name: "Başarılı!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setColor("#008000")
                            .setDescription(`**Sistemdeki yetkili rolü başarı ile <@&${menu.values[0]}> olarak ayarlandı!**`)
                            .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setTimestamp()

                            menu.reply({ embeds: [successEmbed], flags: MessageFlags.Ephemeral });

                        });

                        collector.on("end", (collected) => {

                            if(collected.size < 1)return;

                        });

                    });

                };

                if(interaction.values[0] === "kayit-kanali") {

                    const roleSelectRow = new ActionRowBuilder()
                    .addComponents(

                        new ChannelSelectMenuBuilder()
                        .setCustomId("kayit-kanal-select")
                        .setMaxValues(1)
                        .setPlaceholder("Bir kanal seçin.")
                        .addChannelTypes(ChannelType.GuildText)
                        
                    

                    );

                    interaction.reply({ content: "**Aşağıdaki menü üzerinden bir kanal seçin. Kanal seçmek için `30 saniyeniz` var!**", components: [roleSelectRow], flags: MessageFlags.Ephemeral }).then(async (msg) => {

                    const collector = await interaction.channel.createMessageComponentCollector({ max: 1, time: 30000, component_Type: ComponentType.RoleSelect });

                        collector.on("collect", async (menu) => {

                            if(menu.values === undefined || !menu.values || !menu.values[0])return;

                            db.set(`kayitKanal_${interaction.guild.id}`, menu.values[0])

                            const successEmbed = new EmbedBuilder()
                            .setAuthor({ name: "Başarılı!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setColor("#008000")
                            .setDescription(`**Sistemdeki kayıt kanalı başarı ile <#${menu.values[0]}> olarak ayarlandı!**`)
                            .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setTimestamp()

                            menu.reply({ embeds: [successEmbed], flags: MessageFlags.Ephemeral });

                        });

                        collector.on("end", (collected) => {

                            if(collected.size < 1)return;

                        });

                    });

                };

                if(interaction.values[0] === "log-kanali") {

                    const roleSelectRow = new ActionRowBuilder()
                    .addComponents(

                        new ChannelSelectMenuBuilder()
                        .setCustomId("log-kanal-select")
                        .setMaxValues(1)
                        .setPlaceholder("Bir kanal seçin.")
                        .addChannelTypes(ChannelType.GuildText)
                        
                    

                    );

                    interaction.reply({ content: "**Aşağıdaki menü üzerinden bir kanal seçin. Kanal seçmek için `30 saniyeniz` var!**", components: [roleSelectRow], flags: MessageFlags.Ephemeral }).then(async (msg) => {

                    const collector = await interaction.channel.createMessageComponentCollector({ max: 1, time: 30000, component_Type: ComponentType.RoleSelect });

                        collector.on("collect", async (menu) => {

                            if(menu.values === undefined || !menu.values || !menu.values[0])return;

                            db.set(`logKanal_${interaction.guild.id}`, menu.values[0])

                            const successEmbed = new EmbedBuilder()
                            .setAuthor({ name: "Başarılı!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setColor("#008000")
                            .setDescription(`**Sistemdeki log kanalı başarı ile <#${menu.values[0]}> olarak ayarlandı!**`)
                            .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                            .setTimestamp()

                            menu.reply({ embeds: [successEmbed], flags: MessageFlags.Ephemeral });

                        });

                        collector.on("end", (collected) => {

                            if(collected.size < 1)return;

                        });

                    });

                };

                if(interaction.values[0] === "tag") {

                    const modal = new ModalBuilder()
                    .setCustomId("tag-modal")
                    .setTitle("discord.gg/vsc ❤️ can066")

                    const tagInput = new TextInputBuilder()
                    .setCustomId("tag-input")
                    .setStyle(TextInputStyle.Short)
                    .setLabel("Sunucunuzun tagını girin.")
                    .setMaxLength(10)
                    .setRequired(true)

                    const firstActionRow = new ActionRowBuilder().addComponents(tagInput);

                    modal.addComponents(firstActionRow);

                    await interaction.showModal(modal);

                    const filter = (interaction) => interaction.customId === "tag-modal";

                    interaction.awaitModalSubmit({ filter, time: 30000 }).then(async (modal) => {

                        const tag = modal.fields.getTextInputValue("tag-input");

                        db.set(`tag_${interaction.guild.id}`, tag);

                        const successEmbed = new EmbedBuilder()
                        .setAuthor({ name: "Başarılı!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                        .setColor("#008000")
                        .setDescription(`**Sistemdeki tag başarı ile `+"`"+`${tag}`+"`"+` olarak ayarlandı!**`)
                        .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                        .setTimestamp()

                        modal.reply({ embeds: [successEmbed], flags: MessageFlags.Ephemeral });

                    });


                };

                if(interaction.values[0] === "delete") {

                    const successEmbed = new EmbedBuilder()
                    .setAuthor({ name: "Başarılı!", iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                    .setColor("#008000")
                    .setDescription(`**Sistemde ayarlı olan roller ve kanallar başarıyla silindi.**`)
                    .setFooter({ text: `discord.gg/vsc ❤️ can066`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                    .setTimestamp()

                    db.delete(`erkekRol_${interaction.guild.id}`);
                    db.delete(`kadinRol_${interaction.guild.id}`);
                    db.delete(`yetkiliRol_${interaction.guild.id}`);
                    db.delete(`kayitsizRol_${interaction.guild.id}`);
                    db.delete(`kayitKanal_${interaction.guild.id}`);
                    db.delete(`logKanal_${interaction.guild.id}`);
                    db.delete(`tag_${interaction.guild.id}`);

                    interaction.reply({ embeds: [successEmbed], flags: MessageFlags.Ephemeral });

                };

            };


        };

    },

};