# Pearbot

Pearbot is a personal project to apply my skills in Node.js and other technologies in a fun and creative way.

### Features

Pearbot contains a variety of commands including:
  - !covid [location] - Returns the latest updated data on COVID-19 through the COVID-19 API.
  - !w [location] - Returns the latest weather info based on location through OpenWeather API
  - !lol [name] [region] - Returns League of Legends player ranked info. from Riot's Developer 
  - !mesos - A currency system based on activity within the server, with all data stored within a MongoDB database.

The bot is hosted on Amazon's AWS EC2 to provide 24/7 uptime on the server.

### Installation
You will need the following keys in order for the bot to work:
* token=YOUR_TOKEN [from https://discord.com/developers]
* LOL_API=YOUR_KEY [from https://developer.riotgames.com/]
* WEATHERAPI=YOUR_KEY [from https://openweathermap.org/]
* MONGO_URI=YOUR_MONGO_URI [from connecting to MongoDB]


These will all need to be stored in a .env file in your root directory.

After cloning the files and setting up the .env file, run the following to install all dependencies:
```sh
npm install 
```
To start the node project, run:
```sh
node index.js
```

License
----

MIT

