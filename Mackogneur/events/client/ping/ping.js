const { USERSWHOPING, PINGUSERS } = require("../../../config/pingUsers.json");
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const pingTimeList = new Map();

function intervalFunc() {
    pingTimeList.forEach((values, keys) => {
        pingTimeList.delete(keys);
    });
}
setInterval(intervalFunc, 360000);

module.exports = {
    ping: function (client, message) {
        for (i in USERSWHOPING) {
            if (message.author.id == USERSWHOPING[i].ID) {
                for (j in USERSWHOPING[i].FOR) {
                    if (USERSWHOPING[i].FOR[j] == 'ALL') {
                        for (k in PINGUSERS) {
                            if (!(pingTimeList.has(USERSWHOPING[i].ID)) || !PINGUSERS[k].COOLDOWN) {
                                //est pas  dans la liste ou pas clooldown
                                try {

                                    const ping = new MessageEmbed()
                                        .setColor('BLUE')
                                        .setTitle(`:loudspeaker: ${USERSWHOPING[i].NAME} a envoyé un message !`)
                                        .setDescription(`'${message.content}'`)
                                        .addFields(
                                            { name: 'LE:', value: `${moment(message.createdAt).format('DD/MM/YY')}`, inline: true },
                                            { name: 'A:', value: `${moment(message.createdAt).format('HH:mm:ss')}`, inline: true }
                                        );

                                    client.users.cache.get(PINGUSERS[k].ID).send(ping);
                                } catch (error) {
                                    console.log(`ID inexistent for ${PINGUSERS[k].NAME}`)
                                }
                            } 
                        }

                    } else {
                        for (k in PINGUSERS) {
                            if (!(pingTimeList.has(USERSWHOPING[i].ID)) || !PINGUSERS[k].COOLDOWN) {
                                //est pas  dans la liste ou pas clooldown
                                if (USERSWHOPING[i].FOR[j] == PINGUSERS[k].NAME) {
                                    try {
                                        const ping = new MessageEmbed()
                                            .setColor('YELLOW')
                                            .setTitle(`:loudspeaker: ${USERSWHOPING[i].NAME} a envoyé un message !`)
                                            .setDescription(`'${message.content}'`)
                                            .addFields(
                                                { name: 'LE:', value: `${moment(message.createdAt).format('DD/MM/YY')}`, inline: true },
                                                { name: 'A:', value: `${moment(message.createdAt).format('HH:mm:ss')}`, inline: true }
                                            );

                                        client.users.cache.get(PINGUSERS[k].ID).send(ping);
                                    } catch (error) {
                                        console.log(`ID inexistent for ${PINGUSERS[k].NAME}`)
                                    }
                                }
                            }
                        }
                    }
                }
                pingTimeList.set(USERSWHOPING[i].ID, USERSWHOPING[i].NAME)
            }
            
        }
    }
}