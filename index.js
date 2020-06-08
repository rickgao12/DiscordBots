const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir('./cmds/', (err, files) => {
	if (err) console.error(err);
	let jsfiles = files.filter((f) => f.split('.').pop() === 'js');
	if (jsfiles.length <= 0) {
		console.log('No commands found');
		return;
	}
	console.log(`Loading ${jsfiles.length} commands`);
	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded`);
		bot.commands.set(props.help.name, props);
	});
});

const prefix = process.env.prefix;

bot.on('ready', async () => {
	console.log(`This bot is online ${bot.user.username}`);
});

bot.on('message', async (message) => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;

	if (!message.content.startsWith(prefix)) {
		return;
	}

	var args = message.content.slice(prefix.length).trim().split(/ +/g);

	const command = args.shift().toLowerCase();
	args = args.join(' ');
	console.log(args);
	let cmd = bot.commands.get(command);
	if (cmd) cmd.run(bot, message, command, args);

	return;
});

bot.login(process.env.token);
