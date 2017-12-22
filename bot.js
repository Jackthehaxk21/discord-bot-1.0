const Discord = require('discord.js');
const client = new Discord.Client();
var startup = 0;
const fs = require("fs");

let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
const prefix = "!";

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
  defaultChannel.send("Welcome our new user!\n" + member.user);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
  defaultChannel.send("Oh No, It looks like " + member.user + " left us !");
});

client.on('ready', () => {
    console.log('I am ready!');
    startup = 1;
    var channel = client.channels.find("name", 'general');
    channel.send("Hello @everyone , I am now ready !");
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    switch (command) {
        case "announce" :
            message.guild.channels.find("name", "announcments").sendMessage(args[0]);
            break;
        case "ping" :
            message.channel.send('Pong!');
            console.log("Pinged.");
            break;
        case "test" :
            message.channel.send(args[0]);
            message.channel.send(args[1]);
            break;
        case "setrole" :
            let role = message.guild.roles.find("name", args[1]);
            //let role = args[1];
            //message.channel.send(role);
            let member = message.mentions.members.first();
            let perms = message.member.permissions;
            /*try {
                if(message.member.roles.has(role.id)) {
                    message.channel.send("User already has that role,\nSetRole - Failed.");
                    break;
                }
            } catch (e) {
                //console.log(e);
            }*/
            // Check if a member has a specific permission on the guild!
            let has_perm = message.member.hasPermission("MANAGE_ROLES");
            //message.channel.send(member);
            if (has_perm){
                try {
                    member.addRole(role);
                } catch (e) {
                    message.channel.send("INVALID ROLE");
                    //console.log(e);
                }
                try {
                    if(member.roles.has(role.id)) {
                        message.channel.send("SetRole Success !");
                        console.log("SetRole");
                    } else {
                        message.channel.send("SetRole Success !");
                        //message.channel.send("SetRole Failed\nMake sure you spelt everything correct");
                    }
                } catch (e) {
                    console.log(e);
                    message.channel.send("SetRole Failed\nMake sure you spelt everything correct");
                }
            } else {
                message.channel.send("SetRole Failed - You do not have the perm (MANAGE_ROLES)");
            }
            //message.channel.send(member+" was added to "+role);
            break;
        case "removerole" :
            message.channel.send("test");
            break;
        case "purge" :
            const user = message.mentions.users.first();
            const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);
            if (amount >= 100) {
              message.channel.send("Sorry the amount must be between 3-100");
              break;
            } else {
              if (amount <= 2) {
                message.channel.send("Sorry the amount must be between 3-100");
                break;
              }
            }
            if (!amount) return message.reply('Must specify an amount to delete!');
            if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
            message.channel.fetchMessages({
                limit: amount,
            }).then((messages) => {
                if (user) {
                    const filterBy = user ? user.id : Client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                }
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            });
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
