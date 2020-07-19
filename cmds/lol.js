const Discord = require('discord.js');
const axios = require('axios');

module.exports.run = async (bot, message, command, args) => {
	args = args.split(/ +/g);
	try {
		if (!args[1]) {
			var region = 'na1';
		} else {
			var region = args[1] + '1';
			if (args[1] === 'kr') {
				region = 'kr';
			}
		}

		const getSummonerId = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${args[0]}?api_key=${process
			.env.LOL_API}`;

		const data = await axios.get(getSummonerId);

		const { name, id, summonerLevel, profileIconId } = data.data;

		const getSummonerData = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process
			.env.LOL_API}`;

		const summonerDataRequest = await axios.get(getSummonerData);

		const summonerData = summonerDataRequest.data.find((queue) => queue.queueType === 'RANKED_SOLO_5x5');

		if (summonerData) {
			console.log(summonerData);
			const profileIcon = `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/profileicon/${profileIconId}.png`;
			const winRatio = Math.trunc(summonerData.wins / (summonerData.wins + summonerData.losses) * 100);

			const embed = new Discord.MessageEmbed()
				.setTitle(name)
				.setColor(0x42e6f5)
				.addField('Queue Type', summonerData.queueType.split('_').join(' '), true)
				.addField(
					'Player Rank: ',
					`${summonerData.tier} ${summonerData.rank} ${summonerData.leaguePoints}LP`,
					true
				)
				.addField('\u200b', '\u200b', true)
				.addField('Win Ratio: ', `${winRatio}%`, true)
				.addField('Wins: ', summonerData.wins, true)
				.addField('Losses: ', summonerData.losses, true)
				.addField('Level: ', summonerLevel, true)
				.setThumbnail(profileIcon);

			if (summonerData.miniSeries) {
				embed.addField(
					'In Promos: ',
					`${summonerData.miniSeries.wins} wins, ${summonerData.miniSeries.losses} losses`
				);
			}

			message.channel.send(embed);
		} else {
			return message.channel.send('No ranked solo queue data');
		}
	} catch (e) {
		return message.channel.send('Please enter a valid name (no spaces) or region');
	}
};

module.exports.help = {
	name: 'lol'
};
