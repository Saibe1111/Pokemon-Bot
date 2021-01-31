const { MessageEmbed } = require('discord.js');
const { ADMIN } = require('../../config/roles.json');
const { PREFIX } = require("../../config.json");

module.exports.help = {
    name: 'help',
    aliases: ["h"],
    description: 'Affiche toute les commandes.',
    botIdArg: true,
    usage: 'Pokemon',
    args: true,
    admin: false
}

module.exports.run = (client, message, args) => {

    let commands = message.client.commands.array();

    let admin = false;
    for (a in ADMIN) {
        if (message.member.roles.cache.has(ADMIN[a].ID)) {
            admin = true;
        }
    }

    let helpEmbed = new MessageEmbed()
        .setTitle(`__${client.user.username} aide__`)
        .setFooter(`___________________________________________\nListe de toute les commandes de ${client.user.username}`)
        .setColor('BLUE');

    commands.forEach((cmd) => {
        if (!cmd.help.admin) {
            if (cmd.help.usage === '') {
                helpEmbed.addField(
                    `${PREFIX}${cmd.help.name}`,
                    `${cmd.help.description}`, false
                );
            } else {
                helpEmbed.addField(
                    `${PREFIX}${cmd.help.name} <${cmd.help.usage}>`,
                    `${cmd.help.description}`, false
                );
            }
        }
    });

    let helpAdminEmbed = new MessageEmbed()
        .setTitle(`__${client.user.username} aide admin__`)
        .setFooter(`_________________________________________________\nListe de toute les commandes admin de ${client.user.username}`)
        .setColor('ORANGE');

    commands.forEach((cmd) => {

        if (cmd.help.admin) {
            if (cmd.help.usage === '') {
                helpAdminEmbed.addField(
                    `${PREFIX}${cmd.help.name}`,
                    `${cmd.help.description}`, false
                );
            } else {
                helpAdminEmbed.addField(
                    `${PREFIX}${cmd.help.name} <${cmd.help.usage}>`,
                    `${cmd.help.description}`, false
                );
            }
        }
    });

    if (admin) { message.channel.send(helpAdminEmbed); }
    message.channel.send(helpEmbed);


}