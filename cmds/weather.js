const Discord = module.require('discord.js');
const axios = module.require('axios');
const botSettings = module.require('../config/botSettings.json');

module.exports.run = async (bot, message, command, args) => {
    try {
        let getWeather = async () => {
            if (args.includes(' ')) {
                args = args.split(' ').join('+');
                let finalUrl =
                    'https://api.openweathermap.org/data/2.5/weather?q=' +
                    args +
                    '&appid=' +
                    botSettings.WEATHERAPI +
                    '&units=imperial';
                let response = await axios.get(finalUrl);
                let weather = response.data;
                return weather;
            } else {
                let finalUrl =
                    'https://api.openweathermap.org/data/2.5/weather?q=' +
                    args +
                    '&appid=' +
                    botSettings.WEATHERAPI +
                    '&units=imperial';
                let response = await axios.get(finalUrl);
                let weather = response.data;
                return weather;
            }
        };
        let weatherValue = await getWeather();
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Weather in ${weatherValue.name}`)
            .addField('Temperature: ', weatherValue.main.temp_min + ' °F')
            .addField('Humidity: ', weatherValue.main.humidity)
            .addField('Sky: ', weatherValue.weather[0].description)
            .addField('Wind: ', weatherValue.wind.speed + ' m/s')
            .setThumbnail('https://i.imgur.com/xVp5A8Z.png');

        message.channel.send(embed);
    } catch (e) {
        console.log(e);
        message.channel.send('Please enter a valid location');
    }
};

module.exports.help = {
    name: 'w'
};