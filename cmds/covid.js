const Discord = module.require('discord.js');
const commaNumber = module.require('comma-number');
const axios = module.require('axios');

module.exports.run = async (bot, message, command, args) => {
	try {
		const url = 'https://api.covid19api.com/summary';
		const data = await axios.get(url);
		const { Global, Countries } = data.data;

		if (!args) {
			const embed = new Discord.MessageEmbed()
				.setTitle('Updated COVID-19 Numbers')
				.setColor(0xeb3434)
				.addField('New Confirmed: ', commaNumber(Global.NewConfirmed), true)
				.addField('Total Confirmed: ', commaNumber(Global.TotalConfirmed))
				.addField('New Deaths: ', commaNumber(Global.NewDeaths))
				.addField('Total deaths:', commaNumber(Global.TotalDeaths))
				.addField('New Recovered: ', commaNumber(Global.NewRecovered))
				.addField('Total recovered: ', commaNumber(Global.TotalRecovered));

			message.channel.send(embed);
		} else {
			if (args == 'usa' || args == 'us' || args == 'america' || args == 'America') {
				args = 'us';
			}
			console.log(args);
			const findCountry = Countries.find((country) => {
				return (
					country.Country.toLowerCase() === args.toLowerCase() ||
					country.CountryCode.toLowerCase() === args.toLowerCase()
				);
			});
			const lastUpdated = new Date(findCountry.Date).toDateString();
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(findCountry.Country)
				.setThumbnail('https://i.imgur.com/LBnCThp.png')
				.addField(`New Confirmed: `, commaNumber(findCountry.NewConfirmed), true)
				.addField('Total Confirmed: ', commaNumber(findCountry.TotalConfirmed), true)
				.addField('\u200b', '\u200b', true)
				.addField('New Deaths: ', commaNumber(findCountry.NewDeaths), true)
				.addField('Total deaths:', commaNumber(findCountry.TotalDeaths), true)
				.addField('\u200b', '\u200b', true)
				.addField('New Recovered: ', commaNumber(findCountry.NewRecovered), true)
				.addField('Total recovered: ', commaNumber(findCountry.TotalRecovered), true)
				.addField('\u200b', '\u200b', true)
				.setFooter(`Last Updated: ${lastUpdated}`);

			message.channel.send(embed);
		}
	} catch (e) {
		console.log(e);
		message.channel.send('Please enter a valid location');
	}
};
module.exports.help = {
	name: 'covid'
};
