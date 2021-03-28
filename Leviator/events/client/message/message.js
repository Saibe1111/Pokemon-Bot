const axios = require('axios');
const {API_URL} = require('../../../config.json')


module.exports.run = (message) => {

  if (message.channel.type === "dm") return;

  axios.post(`${API_URL}/user`, {
    id: message.author.id,
    username: message.author.username,
    message: 1
  }).catch(function (error) {
      console.log(error);
  });

  axios.get(`${API_URL}/user`, {
    params: {
      id: message.author.id
    }
  }).then(function (response) {

    if(getXpAndLevel(response.data.XP)[0] >= 30){
      //message.reply('Disque d or');
    }


  }).catch(function (error, response) {
    
    try {
      if(error.response.status === 500){
        //message.reply('Ce message est votre premier message !\nJe vous invite à refaire la commande :)');
      }
      else{
        console.log(error);
      }
    }catch (e) {
      
    }
    
    

  });
}

function getXpAndLevel(totalOfXp){

  let level = null;
  let level_test = 1;
  let xp_test = null;
  let xp_OLD = null;

  while (level === null){
    xp_OLD = xp_test;
    xp_test += (5*(level_test-1)*level_test+50*(level_test-1)+100)/20;

    if(totalOfXp < Math.ceil(xp_test)){
      level = level_test-1;
    }

    level_test +=1;
  }
  xp_test = Math.ceil(xp_test) - Math.ceil(xp_OLD)
  xp_OLD = Math.ceil(totalOfXp) - Math.ceil(xp_OLD)
  return [level,xp_OLD,xp_test];
}