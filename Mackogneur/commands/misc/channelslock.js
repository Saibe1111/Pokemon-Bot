const { MessageEmbed } = require('discord.js');
const { PREFIX } = require("../../config.json");
const jsonC = require("../../config/channels.json");
const jsonR = require("../../config/roles.json");

module.exports.help = {
    name: 'channelslock',
    description: 'Permet de lock tout les salon le serveur.',
    usage: 'on/off',
    args: true,
    aliases: ["chl"],
    admin: true

}

module.exports.run = async (client, message, args) => {
    //roles
    for (r in jsonR.DEFAULT) {
        let defaultR = message.guild.roles.cache.get(jsonR.DEFAULT[r].ID);
        //channels
        for (i in jsonC.CHANNELS) {
            //channels permissions
            for (j in jsonC.CHANNELS[i].PERMISSION) {
                if (jsonC.CHANNELS[i].PERMISSION[j] == 'lock') {
                    if (args[0] == 'on') {
                        let chan = client.channels.cache.get(jsonC.CHANNELS[i].ID)
                        chan.updateOverwrite(defaultR, { 'SEND_MESSAGES': false });
                    } else if (args[0] == 'off') {
                        let chan = client.channels.cache.get(jsonC.CHANNELS[i].ID)
                        chan.updateOverwrite(defaultR, { 'SEND_MESSAGES': true });
                    } else {
                        const messageError = new MessageEmbed()
                            .setColor('RED')
                            .setTitle(":x: Commande")
                            .setDescription(`Merci d'utiliser la commande correctement:\n${PREFIX} channelslock {on/off}`);
                        message.channel.send(messageError);
                        return;
                    }
                }
            }
        }
    }

    if (args[0] == 'on') {
        for (i in jsonC.CHANNELS) {
            //channels permissions
            for (j in jsonC.CHANNELS[i].PERMISSION) {
                if (jsonC.CHANNELS[i].PERMISSION[j] == 'logs') {
                    const messageLock = new MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle("🔒 Channels verrouillé")
                        .setDescription(`Les channels du serveurs on été verrouillé, pour les réouvrirs utiliser la commande:\n${PREFIX} channelslock off`);
                    client.channels.cache.get(jsonC.CHANNELS[i].ID).send(messageLock);
                }else if(jsonC.CHANNELS[i].PERMISSION[j] == 'lock_info'){
                    const messageLock = new MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle("🔒 Channels verrouillé")
                        .setDescription(`Pour des raisons de sécurité le serveur entier est vérouillé pour une durée indéterminée.`);
                    client.channels.cache.get(jsonC.CHANNELS[i].ID).send(messageLock);
                }
            }
        }
        return;
    } else if (args[0] == 'off') {
        for (i in jsonC.CHANNELS) {
            //channels permissions
            for (j in jsonC.CHANNELS[i].PERMISSION) {
                if (jsonC.CHANNELS[i].PERMISSION[j] == 'logs') {
                    const messageLock = new MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle("🔓 Channels déverrouillé")
                        .setDescription("Les channels du serveurs on été déverrouillé avec succès.");
                    client.channels.cache.get(jsonC.CHANNELS[i].ID).send(messageLock);
                }else if(jsonC.CHANNELS[i].PERMISSION[j] == 'lock_info'){
                    const messageLock = new MessageEmbed()
                        .setColor('YELLOW')
                        .setTitle("🔓 Channels déverrouillé")
                        .setDescription("Nous vous remercions de votre compréhension et de votre attente !");
                    client.channels.cache.get(jsonC.CHANNELS[i].ID).send(messageLock);
                }
            }
        }
        return;
    }


}