const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { CHANNELS } = require("../../config/channels.json");

module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
    let nbr = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    client.user.setActivity(nbr + ' Visionnaires', { type: 'WATCHING' });

    for (i in CHANNELS) {
        //channels permissions
        for (j in CHANNELS[i].PERMISSION) {

            if (CHANNELS[i].PERMISSION[j] == 'logs') {

                const leave = new MessageEmbed()
                    .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
                    .setColor('GREEN')
                    .setFooter(`ID: ${client.user.id}`)
                    .addFields(
                        { name: 'Reconnection le :', value: `${moment(new Date()).format('DD/MM/YY')}\n${moment(new Date()).format('HH:mm:ss')}`},
                        { name: 'Visionnaires :', value: `${nbr}`},
                    );
                client.channels.cache.get(CHANNELS[i].ID).send(leave);

            }
        }
    }
}