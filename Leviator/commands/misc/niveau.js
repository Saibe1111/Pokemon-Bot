const {API_URL} = require('../../config.json')
const axios = require('axios');
const {MessageEmbed} = require('discord.js');
const {getXpAndLevel} = require ('../../utils/level.js');

module.exports.help = {
    name: 'niveau'
}

module.exports.run = (client, message, args) => {

    axios.get(`${API_URL}/user`, {
        params: {
            id: message.author.id
        }
    })
        .then(function (response) {


          let xp = getXpAndLevel(response.data.XP)[1];
          let onXp = getXpAndLevel(response.data.XP)[2];
          let nbBar = Math.round((xp/onXp)*10);
          let bar = ['◯','◯','◯','◯','◯','◯','◯','◯','◯','◯'];
          for (var i = 0; i < nbBar; i++) {
            bar[i] = '⬤';
          }
          let stringBar ='';
          bar.forEach(element => stringBar+=element);

            const embed = new MessageEmbed()
                .setAuthor(`${message.member.displayName}`, message.member.user.displayAvatarURL())
                .setColor(message.member.displayColor)
                .setFooter(`ID: ${message.member.id}`)
                .setDescription(`**Niveau:** ${getXpAndLevel(response.data.XP)[0]}\n**XP:** ${xp}/${onXp}\n${stringBar}`);
            message.channel.send(embed);

        })
        .catch(function (error, response) {
            if(error.response.status === 500){
              message.reply('Ce message est votre premier message !\nJe vous invite à refaire la commande :)');
            }
            else{
              console.log(error);
            }

        });
}