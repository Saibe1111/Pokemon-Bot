const jsonC = require("../../../config/channels.json");
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Verification = require('./verification.js');

module.exports = {
    message: function (client, member) {
        for (i in jsonC.CHANNELS) {
            //channels permissions
            for (j in jsonC.CHANNELS[i].PERMISSION) {
    
                if (jsonC.CHANNELS[i].PERMISSION[j] == 'join_logs') {
                    let nbr = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
                    const leave = new MessageEmbed()
                        .setAuthor(`${member.displayName}`, member.user.displayAvatarURL())
                        .setColor('GREEN')
                        .setFooter(`ID: ${member.id}`)  
                        .addFields(
                            { name: 'A rejoint le :', value: `${moment(member.joinedAt).format('DD/MM/YY')}\n${moment(member.joinedAt).format('HH:mm:ss')}`, inline: true },
                            { name: 'A validé le :', value: `${moment(new Date()).format('DD/MM/YY')}\n${moment(new Date()).format('HH:mm:ss')}`, inline: true},
                            { name: 'A validé en :', value: `${Verification.list.get(member.id).getNumber()} essai(s)`, inline: true},
                        )
                        .setDescription(`\nNous sommes maintenant : **${nbr}**`);
                    client.channels.cache.get(jsonC.CHANNELS[i].ID).send(leave);
                    
                }
            }
        }
      }
}