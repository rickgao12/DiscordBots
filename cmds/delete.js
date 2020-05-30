const Discord = module.require('discord.js')

module.exports.run = async (bot, message, command, args) => {
    message.channel.bulkDelete(args[0])
}

module.exports.help = {
    name: "delete"
}