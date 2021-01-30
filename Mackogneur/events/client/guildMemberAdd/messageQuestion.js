const { MessageEmbed } = require('discord.js');
const Verification = require('./verification.js');
const jsonQ = require("../../../config/questions.json");


module.exports = {
    sendQuestion: function (member, number) {

        let random = Math.floor(Math.random() * Math.floor(jsonQ.QUESTIONS.length));
        new Verification(member.id, random, member, number);

        let messageEmbed = `Bienvenue sur le serveur discord de la communauté visionnaire <@${member.id}> !
    Merci de lire les règles du serveur et de répondre à la question suivante:
    :warning: Merci de répondre par la lettre associé à la réponse !\n\n **${jsonQ.QUESTIONS[random].QUESTION}**\n`;
        let lettre = 'A';
        for (i in jsonQ.QUESTIONS[random].ANSWERS) {
            messageEmbed += `${lettre}) ${jsonQ.QUESTIONS[random].ANSWERS[i]}\n`
            lettre = nextChar(lettre);
        }

        const questionMessage = new MessageEmbed()
            .setTitle('Question de vérification')
            .setColor('RANDOM')
            .setDescription(messageEmbed)
            .setFooter('All rights reserved');
        member.send(questionMessage);
    }
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}