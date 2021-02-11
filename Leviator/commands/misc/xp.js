module.exports.help = {
    name: 'xp'
}

const axios = require('axios');

module.exports.run = (client, message, args) => {

    axios.get('http://localhost:8000/user', {
        params: {
            id: message.author.id
        }
    })
        .then(function (response) {
            console.log(response.data)
            message.reply(response.data.XP)
        })
        .catch(function (error) {
            console.log(error);
        });

}