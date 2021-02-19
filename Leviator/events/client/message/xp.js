const axios = require('axios');
const {API_URL} = require('../../../config.json')

const list = [];

module.exports.run = (message) =>{

  if (message.author.bot) return;
  if(message.channel.type === "dm") return;

  if(!list.includes(message.author.id)){
    axios.post(`${API_URL}/user`, {
      id: message.author.id,
      username: message.author.username,
      addXp: 1
    });
    function intervalFunc() {
      list.shift();
    }
    setInterval(intervalFunc, 100); //60000 = 1 min entre chaque xp
    list.push(message.author.id)
  }

}
