const Verification = require('./verification.js');
const {DEFAULT, JOIN} = require("../../../config/roles.json");
const messageLogs = require('./messageLogs.js');
const messageWelcome = require('./messageWelcome.js');
const {sendQuestion} = require('./messageQuestion.js')


module.exports = {
    
    checkQuestion: function (message, client) {

        let Mid = message.author.id;

        if (message.author.bot) return;
        if (!Verification.list.has(Mid) || (message.content == '')) return;

        let memberVerif = Verification.list.get(Mid).getMember();
        let numberVerif = Verification.list.get(Mid).getNumber() + 1;

        if (message.content.toUpperCase() == Verification.list.get(Mid).getAnswer()) {
            messageWelcome.message(client, memberVerif);
            messageLogs.message(client, memberVerif);

            for(r in DEFAULT){
                memberVerif.roles.add(memberVerif.guild.roles.cache.get(DEFAULT[r].ID));
            }
            memberVerif.roles.remove(memberVerif.guild.roles.cache.get(JOIN.ID));

            message.reply('Bonne réponse ! Tu viens d\'obtenir ton rôle sur le serveur !');
            Verification.list.delete(Mid);
        } else {
            message.reply('Mauvaise réponse ! Consultez à nouveau les règles et répondez à cette question !');
            Verification.list.delete(Mid);
            sendQuestion(memberVerif,numberVerif);
        }
    }
}