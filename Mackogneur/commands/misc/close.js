const Verification = require('../../events/client/guildMemberAdd/verification.js');
const { DEFAULT, JOIN } = require("../../config/roles.json");
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const { SUPERUSER } = require('../../config.json');

module.exports.help = {
    name: 'close',
    description: 'Permet de fermer proprement le bot. **Ne pas utiliser !**',
    usage: 'y/i',
    args: true,
    aliases: ["c"],
    admin: true
}

module.exports.run = async (client, message, args) => {

    if (args[0] === 'i' && message.author.id === SUPERUSER) {

        let closeEmbed = new MessageEmbed()
            .setTitle(`__Close info__`)
            .setColor('BLUE')
            .setDescription(`${Verification.list.size} en attente.`);

        Verification.list.forEach((values, keys) => {
            let memberNonVerif = Verification.list.get(keys).getMember();
            closeEmbed.addField(
                `${memberNonVerif.user.tag}`,
                `${moment(memberNonVerif.joinedAt).format('DD/MM/YY')}`, true);
        });
        message.delete()
        message.channel.send(closeEmbed).then(msg => {
            msg.delete({ timeout: 15000 });
        });
    }else if(args[0] === 'y' && message.author.id === SUPERUSER){
        Verification.list.forEach((values,keys)=>{
            let memberNonVerif = Verification.list.get(keys).getMember();
            for(r in DEFAULT){
                memberNonVerif.roles.add(memberNonVerif.guild.roles.cache.get(DEFAULT[r].ID));
            }
            memberNonVerif.roles.remove(memberNonVerif.guild.roles.cache.get(JOIN.ID));
            Verification.list.delete(keys);
        });
        let closeEmbed = new MessageEmbed()
        .setTitle(`__Close info__`)
        .setColor('BLUE')
        .setDescription(`Le bot peut redémarrer.`);

        message.channel.send(closeEmbed).then(msg => {
            msg.delete({ timeout: 15000 });
        });
        message.delete()
    }
}