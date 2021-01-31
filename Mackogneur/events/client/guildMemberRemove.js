const jsonC = require("../../config/channels.json");
const { MessageEmbed } = require('discord.js');
const moment = require('moment'); // require
const Verification = require('./guildMemberAdd/verification.js')

module.exports = (client, member) => {
    if(Verification.list.has(member.id)){
        Verification.list.delete(member.id);
    }
    
    for (i in jsonC.CHANNELS) {
        //channels permissions
        for (j in jsonC.CHANNELS[i].PERMISSION) {

            if (jsonC.CHANNELS[i].PERMISSION[j] == 'leave_logs') {
                let nbr = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
                let today = moment(new Date());
                let joinedDate = moment(member.joinedAt);

                const leave = new MessageEmbed()
                    .setAuthor(`${member.displayName}`, member.user.displayAvatarURL())
                    .setColor('RED')
                    .setFooter(`ID: ${member.id}`)
                    .setDescription(`Vient de quitter le serveur.\nIl avait rejoint le : **${joinedDate.format('DD/MM/YY')}** soit il y a : **${today.diff(joinedDate, 'days')} jours**\nNous sommes maintenant : **${nbr}**`);
                client.channels.cache.get(jsonC.CHANNELS[i].ID).send(leave);
            }
        }
    }

}