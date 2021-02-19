const axios = require('axios');
const {API_URL} = require('../../config.json');


module.exports.help = {
  name: 'classement'
}
module.exports.run = async (client, message, args) => {

  axios.get(`${API_URL}/users`)
  .then(function (response) {

    let txt = '';
    let number = 0;
    let pages = [];
    let page = 1;

    response.data.forEach(element => {
      number++;
      txt =  txt + number + ') ' + updateUser(element.Username,15) + ' Niveau: ' + updateUser(getXpAndLevel(element.XP)[0].toString(),3) + ' XP: ' + updateUser(getXpAndLevel(element.XP)[1].toString(),5) + '\n';
      if (number % 10 == 0){
        pages.push(txt);
        txt = '';
      }
    });
    pages.push(txt);

    let embed = '```js\n';
    embed += pages[page - 1];
    embed += '═══════════════════════════════════════\n';
    embed +='Page ' + page + '/' + pages.length + '```';

    message.channel.send(embed).then(msg => {
      msg.react('🔼').then(r => {
        msg.react('🔽');
      });

      const backwardsFilter = (reaction, user) => reaction.emoji.name === '🔼' && user.id === message.author.id;
      const fowardsFilter = (reaction, user) => reaction.emoji.name === '🔽' && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, {time:600000});
      const forwards = msg.createReactionCollector(fowardsFilter, {time:600000});

      backwards.on('collect', r => {
        msg.reactions.resolve("🔼").users.remove(message.author.id);

        if(page === 1) return;
        page--;
        embed = '```js\n';
        embed += pages[page - 1];
        embed += '════════════════════════════════════════════\n';
        embed +='Page ' + page + '/' + pages.length + '```';
        msg.edit(embed);

      });
      forwards.on('collect', r => {
        msg.reactions.resolve("🔽").users.remove(message.author.id);

        if(page === pages.length) return;
        page++;
        embed = '```js\n';
        embed += pages[page - 1];
        embed += '════════════════════════════════════════════\n';
        embed +='Page ' + page + '/' + pages.length + '```';
        msg.edit(embed);

      });

    });

  })
  .catch(function (error) {
    console.log(error);
  });

}

function updateUser(string, len) {
  if (string.length > len) {
    return string.substr(0, len);
  } else if (string.length < len) {
    for (var i = string.length; i < len; i++) {
      string += ' ';
    }
  }
  return string
}

function getXpAndLevel(totalOfXp){

  let level = null;
  let level_test = 1;
  let xp_test = null;
  let xp_OLD = null;

  while (level === null){
    xp_OLD = xp_test;
    xp_test += (5*(level_test-1)*level_test+50*(level_test-1)+100)/20;

    if(totalOfXp < Math.round(xp_test)){
      level = level_test-1;
    }
    level_test +=1;
  }
  xp_OLD = totalOfXp - xp_OLD
  return [level,xp_OLD,xp_test];
}
