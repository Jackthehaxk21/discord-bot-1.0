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
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    switch (command) {
        case "ping" :
            message.channel.send('Pong!');
            break;
        case "test" :
            message.channel.send(args[0]);
            message.channel.send(args[1]);
            break;
        case "setrole" :
            message.channel.send("setrole");
            let role = message.guild.roles.find("name", args[1]);
            //let role = args[1];
            //message.channel.send(role);
            let member = message.mentions.members.first();
            //message.channel.send(member);
            member.addRole(role);
            //message.channel.send(member+" was added to "+role);
            break;
    }
    /*message.reply(message.content);
    if (!points[message.author.id]) points[message.author.id] = {
      points: 0,
      level: 0
    };
    let userData = points[message.author.id];
    userData.points++;

    let curLevel = Math.floor(0.3 * Math.sqrt(userData.points));
    if (curLevel > userData.level) {
      // Level up!
      userData.level = curLevel;
      message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
    }
    
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    if (message.content.startsWith(prefix + "level")) {
      message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
    }
    fs.writeFile("./points.json", JSON.stringify(points), (err) => {
      if (err) console.error(err)
    });
    
    if (startup === 1) {
        startup = 0;
    }
    if (message.content.startsWith(prefix + 'ping')) {
    	//message.reply('pong');
        message.channel.send('Pong!');
        console.log('pinged !')
  	}
    if (message.content === '!help') {
        console.log('help documents have been sent to '+message.author)
        message.reply('Documentation has been sent to you via Private Message (PM)')
        message.author.send("Help Documentation for JACKTHEHACK21 (BOT)")
        message.author.send("------------------------------------------")
        message.author.send("!ping - see how fast it takes me to pong !")
        message.author.send("!level - display youre XP AND LEVEL !")
    }
    if (message.content === "!loop") { 
      var interval = setInterval (function () {
        message.channel.send("Thank you for using me !")
      }, 60 * 60000);
    }*/
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
