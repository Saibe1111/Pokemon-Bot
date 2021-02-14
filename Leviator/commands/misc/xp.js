const {API_URL} = require('../../config.json')

module.exports.help = {
    name: 'xp'
}

const axios = require('axios');

module.exports.run = (client, message, args) => {

    axios.get(`${API_URL}/user`, {
        params: {
            id: message.author.id
        }
    })
        .then(function (response) {
            message.reply(response.data.XP)
        })
        .catch(function (error) {
            console.log(error);
        });

}
