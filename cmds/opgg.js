const Discord = module.require('discord.js')
const opggScrape = require('opgg-scrape');

module.exports.run = async (bot, message, command, args) => {
  args = args.split(/ +/g)
  const stats = opggScrape.getStats(args[0], {
    region: args[1],
    refresh: false
  }).then(stats => {
    let rankedLP = ""
    if (stats.rankedLP !== 'none') {
      rankedLP = stats.rankedLP
    }

    const embed = new Discord.RichEmbed()
      .setTitle(stats.name)
      .setColor(0x42e6f5)
      .addField('Player Rank: ', stats.rank + " " + rankedLP)
      .addField('Level: ', stats.level)
      .addField('KDA: ', stats.KDARatio)
      .setThumbnail(stats.avatarURL)
    message.channel.sendEmbed(embed)
  }).catch(error => {
    message.channel.send("Could not find opgg name")

  });
}

module.exports.help = {
  name: "opgg"

}