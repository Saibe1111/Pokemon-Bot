const {sendQuestion} = require('./guildMemberAdd/messageQuestion.js');
const {JOIN} = require('../../config/roles.json')

module.exports = (client, member) => {

    sendQuestion(member,1)
    member.roles.add(member.guild.roles.cache.get(JOIN.ID));
    
}
