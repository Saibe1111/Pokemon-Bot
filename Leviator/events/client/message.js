const { PREFIX } = require("../../config.json");

module.exports = (client, message) => {    

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    if(message.channel.type === "dm") return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();


    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

    command.run(client, message, args);
}
