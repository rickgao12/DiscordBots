const Discord = module.require('discord.js');
const commaNumber = module.require('comma-number')
const axios = module.require('axios')

module.exports.run = async (bot, message, command, args) => {

    try {
        const url = 'https://api.covid19api.com/summary';
        const data = await axios.get(url)
        const {
            Global,
            Countries
        } = data.data

        if (!args) {
            const embed = new Discord.MessageEmbed()
                .setTitle('Updated COVID-19 Numbers')
                .setColor(0xeb3434)
                .addField('New Confirmed: ', Global.NewConfirmed)
                .addField('Total Confirmed: ', Global.TotalConfirmed)
                .addField('New Deaths: ', Global.NewDeaths)
                .addField('Total deaths:', Global.TotalDeaths)
                .addField('New Recovered: ', Global.NewRecovered)
                .addField('Total recovered: ', Global.TotalRecovered)

            message.channel.sendEmbed(embed);

        } else {

            if (args == 'usa' || args == 'us' || args == 'america' || args == 'America') {
                args = "us";
            }
            console.log(args)
            const findCountry = (Countries.find(country => {
                return ((country.Country.toLowerCase() === args.toLowerCase()) || (country.CountryCode.toLowerCase() === args.toLowerCase()))
            }))

            const embed = new Discord.MessageEmbed()

                .setColor('#0099ff')
                .setTitle(findCountry.Country)
                .setThumbnail('https://i.imgur.com/LBnCThp.png')
                .addField('New Confirmed: ', findCountry.NewConfirmed)
                .addField('Total Confirmed: ', findCountry.TotalConfirmed)
                .addField('New Deaths: ', findCountry.NewDeaths)
                .addField('Total deaths:', findCountry.TotalDeaths)
                .addField('New Recovered: ', findCountry.NewRecovered)
                .addField('Total recovered: ', findCountry.TotalRecovered)

            message.channel.send(embed);
        }
    } catch (e) {
        console.log(e)
        message.channel.send("Please enter a valid location")
    }




}
module.exports.help = {
    name: "covid"
}