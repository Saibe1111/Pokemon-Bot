const axios = require('axios');
const {API_URL} = require('../../../config.json')
const {getXpAndLevel} = require ('../../../utils/level.js');

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
