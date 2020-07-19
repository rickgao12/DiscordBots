const Discord = require('discord.js');
const Money = require('../models/money');

module.exports.run = async (bot, message, command, args) => {
	args = args.split(' ');
	if (args[0] === 'steal') {
		let stolen = 0;
		const member = message.mentions.members.first().user.id;
		if (!member) {
			return message.channel.send('You need to steal from someone');
		}
		if (member === message.author.id) {
			return message.channel.send('You cannot steal from yourself');
		}
		Money.find({ userId: member, serverId: message.guild.id }, async (err, res) => {
			if (err) return console.log(err);

			if (!res) return message.channel.send('Nothing to steal');

			let stolenAmt = Math.ceil(Math.random() * res.money / 2);
			stolen = stolenAmt;
			res.money = res.money - stolenAmt;
			await res.save();

			return message.channel.send(`You stole ${stolenAmt} mesos`);
		});

		Money.findOne({ userId: message.author.id, serverId: message.guild.id }, async (err, res) => {
			if (err) return console.log(err);

			res.money = res.money + stolen;
			await res.save();
		});
	} else if (args[0] === 'top') {
		Money.find({ serverId: message.guild.id }).sort([ [ 'money', 'descending' ] ]).exec(async (err, res) => {
			if (err) return console.log(err);
			let embed = new Discord.MessageEmbed().setTitle('Leaderboards');
			if (res.length === 0) {
				embed.addField('No data found');
			} else if (res.length < 10) {
				embed.setColor('BLUE');
				for (i = 0; i < res.length; i++) {
					let member = await message.guild.members.fetch(res[i].userId);
					embed.addField(`${i + 1}. ${member.user.username}`, `Mesos: ${res[i].money}`);
				}
			}
			message.channel.send(embed);
		});
	} else {
		Money.findOne(
			{
				userId: message.author.id,
				serverId: message.guild.id
			},
			(err, res) => {
				if (err) return console.log(err);

				let embed = new Discord.MessageEmbed()
					.setTitle('My Wallet')
					.setAuthor(message.author.username)
					.setThumbnail(message.author.avatarURL())
					.setColor(0xe6f542);

				if (!res) {
					embed.addField('Mesos', '0', true);
					return message.channel.send(embed);
				} else {
					embed.addField('Mesos', res.money, true);
					return message.channel.send(embed);
				}
			}
		);
	}
};

module.exports.help = {
	name: 'mesos'
};
