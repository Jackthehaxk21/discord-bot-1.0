const Discord = require('discord.js');
const client = new Discord.Client();
var startup = 0;
const fs = require("fs");

let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
const prefix = "!";


client.on('ready', () => {
    console.log('I am ready!');
    startup = 1;
});

client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    if (!points[message.author.id]) points[message.author.id] = {
      points: 0,
      level: 0
    };
    let userData = points[message.author.id];
    userData.points++;

    let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
    message.channel.send(curLevel);
    if (curLevel > userData.level) {
      // Level up!
      userData.level = curLevel;
      message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
    }

    if (message.content.startsWith(prefix + "level")) {
      message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
    }
    fs.writeFile("./points.json", JSON.stringify(points), (err) => {
      if (err) console.error(err)
    });
    
    if (startup === 1) {
        startup = 0;
    }
    if (message.content === '!ping') {
    	message.reply('pong');
        message.channel.send('Pong!');
        console.log('pinged !')
  	}
    if (message.content === '!help') {
        console.log('help documents have been sent to '+message.author)
        message.reply('Documentation has been sent to you via Private Message (PM)')
        message.author.send("Help Documentation for JACKTHEHACK21 (BOT)")
        message.author.send("------------------------------------------")
        message.author.send("!ping - see how fast it takes me to pong !")
    }
    if (message.content === "!loop") { 
      var interval = setInterval (function () {
        message.channel.send("Thank you for using me for more help type '!help'")
      }, 5 * 60000); 
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
