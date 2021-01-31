const { PREFIX } = require("../../config.json");
const { MessageEmbed } = require('discord.js');
const { checkQuestion } = require('./guildMemberAdd/checkQuestion.js');
const { ping } = require('./ping/ping.js');
const { ADMIN } = require('../../config/roles.json');
const jsonC = require("../../config/channels.json");



module.exports = (client, message) => {

    checkQuestion(message, client);
    ping(client, message);


    //start
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();


    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;


    let admin = false;
    for (a in ADMIN) {
        if (message.member.roles.cache.has(ADMIN[a].ID)) {
            admin = true;
        }
    }



    //Vérification admin
    if (!(message.member.hasPermission('ADMINISTRATOR') || admin) && command.help.admin) {
        const messagePing = new MessageEmbed()
            .setColor('RED')
            .setTitle(":x: Commande")
            .setDescription(`Vous n'avez pas accès à cette commande.`);
        message.channel.send(messagePing).then( msg =>{
            msg.delete({ timeout: 30000 }); 
        });
        return;
    }
    
    let cmd = false;
    if (!(message.member.hasPermission('ADMINISTRATOR') || admin)) {
        for (i in jsonC.CHANNELS) {
            //channels permissions
            if (message.channel.id === jsonC.CHANNELS[i].ID) {
                for (j in jsonC.CHANNELS[i].PERMISSION) {
                    if ((jsonC.CHANNELS[i].PERMISSION[j] === 'commands')) {
                        cmd = true;
                    }
                }
                if(!cmd){
                    message.delete();
                    return;
                }
            }
            
        }
    }

    const ErrorMessage = () => {
        const messageError = new MessageEmbed()
            .setColor('RED')
            .setTitle(":x: Commande")
            .setDescription(`Merci d'utiliser la commande correctement:\n${PREFIX} ${command.help.name} {${command.help.usage}}`);
        message.channel.send(messageError).then( msg =>{
            msg.delete({ timeout: 30000 }); 
        });
    }

    //Vérification args
    if (command.help.args && !args.length) {
        ErrorMessage();
        return;
    }

    //Vérification botIdArg
    if (command.help.botIdArg && !(args[0] === `<@!${client.user.id}>` || args[0] === `<@${client.user.id}>` || args[0].toLowerCase() === client.user.username.toLowerCase())) {
        return;
    }

    command.run(client, message, args);
}

