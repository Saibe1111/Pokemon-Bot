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


}
