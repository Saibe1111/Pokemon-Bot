const { PREFIX } = require("../../config.json");
const xp = require("./message/xp.js")
const countMessage = require("./message/message.js")

module.exports = (client, message) => {

    if (message.author.bot) return;
    xp.run(message);
    countMessage.run(message);

    if (!message.content.startsWith(PREFIX)) return;
    if(message.channel.type === "dm") return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();


    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

    command.run(client, message, args);
}
