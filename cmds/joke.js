const Discord = module.require('discord.js')
const axios = module.require('axios')

module.exports.run = async (bot, message, command, args) => {
  let getJoke = async () => {

    let response = await axios.get("https://official-joke-api.appspot.com/random_joke")
    let joke = response.data
    return joke
  }
  let jokeValue = await getJoke();
  message.reply(`${jokeValue.setup} \n\n ${jokeValue.punchline}`)

}

module.exports.help = {
  name: "joke"

}