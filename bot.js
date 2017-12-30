/*
HIDDEN FILES:
./Roboto.ttf
./FiraCode-Bold.ttf
./Data/Jokes.json
./Data/score.sqlite
./Data/offline.jpg
./Data/online.png
*/

var startup = 0;
const fs = require("fs");
const http = require('http');
const sql = require("sqlite");
const fsn = require('fs-nextra');
const snek = require('snekfetch');
const ytdl = require('ytdl-core');
const express = require('express');
const Discord = require('discord.js');
const { resolve, join} = require('path');
const quotes = require("./Data/Quotes.json");
const yss = require('youtube-simple-search');
const { Canvas } = require('canvas-constructor');

const app =  express();
const client = new Discord.Client();

Canvas.registerFont(resolve(join(__dirname, './Roboto.ttf')), 'Roboto');

//commands
const ban_command = require('./Data/Commands/ban.js');
const role_command = require('./Data/Commands/role.js');
const kick_command = require('./Data/Commands/kick.js');
const coin_command = require('./Data/Commands/coin.js');
const help_command = require('./Data/Commands/help.js');
const joke_command = require('./Data/Commands/joke.js');
const purge_command = require('./Data/Commands/purge.js');
const level_command = require('./Data/Commands/level.js');
const stats_command = require('./Data/Commands/stats.js');
const money_command = require('./Data/Commands/money.js');
const follow_command = require('./Data/Commands/follow.js');
const support_command = require('./Data/Commands/support.js');

var ownerID= process.env.ownerID;
let prof_pic = "https://d30y9cdsu7xlg0.cloudfront.net/png/927902-200.png"
var eight_ball = require("./Data/8Ball.json");
//const search = require('youtube-search');
const key = process.env.YT_KEY; 
sql.open("./Data/Data.sqlite");


//KEEP BOT ONLINE BY PINGING WEBSITE EVERY 4-5 MINUTES
app.get("/", (request, response) => {
  //console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 250000);
//////////////////////////////////////////////////////

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

async function reboot(message) {
    await message.channel.send('**SYSTEM **| Offline', {file: 'https://solidgeargroup.com/wp-content/uploads/2017/01/avoff-e1486020280161.jpg'});
    await console.log('**SYSTEM **| Rebooting...');
    process.exit();
    return;
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


const prefix = "!";

client.on("guildMemberAdd", (member) => {
  if (member.guild.id == "395657844982022145") {
     console.log(member.user.username+'#'+member.user.discriminator);
     member.addRole(member.guild.roles.find("name", "Member"));
     let chan = (member.user.username+'#'+member.user.discriminator).replace(/ +/g,'-').replace('#', '_').toLowerCase();
     chan = member.guild.channels.find('name', chan);
     console.log(chan.overwritePermissions(member, {'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'ATTACH_FILES': true, 'READ_MESSAGES': true}, 'JOIN-PERMS'));
  } else {
    const guild = member.guild;
    const defaultChannel = guild.channels.find("name", "bot-log");
    defaultChannel.send("Welcome our new user!\n" + member.user);
  }
});

client.on("guildMemberRemove", (member) => {
  if (member.guild.id == "395657844982022145") {
    let chan = (member.user.username+'#'+member.user.discriminator).replace(/ +/g,'-').replace('#', '_').toLowerCase();
    chan = member.guild.channels.find('name',chan);
    chan.send('------- CASE CLOSED --------');
  } else {
    const guild = member.guild;
    const defaultChannel = guild.channels.find("name", "bot-log");
    defaultChannel.send("Oh No, It looks like " + member.user + " left us !");
  }
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  
});

client.on('ready', () => {
    var yt_que = [];
    var yt_link= [];
    //client.user.setGame("with my code...");
    client.user.setPresence({game: {name: " !help | Servers: " + client.guilds.size, type: 0}});
    console.log('I am ready!');
    startup = 1;
    var channel = client.channels.find("name", 'general');
    //channel.send(guild.id);
    //client.channels.find("name", "bot-log").send("**SYSTEM** | Online");
    //client.channels.find("name", "bot-log").send("**SYSTEM** | Online", {file: 'https://images6.alphacoders.com/813/813100.png'});
});

client.on('message', message => {
    //console.log(message.channel);
    //console.log(message.guild.id + ' ' + message.guild.name);
    client.user.setPresence({game: {name: " !help | Servers: " + client.guilds.size, type: 0}});
    let voiceChannel;
    if (message.channel.type == 'text') {
      voiceChannel = message.member.voiceChannel;
    }
    
    function search(text) {
        global.searched = text;
        //yss( {key: key, query: text, maxResults: 5}, callback );
        //console.log('Search');
    }
    function callback(result) {
        let YT_DATA = [];
	      YT_DATA = result;
        //console.log(YT_DATA[0]);
        //console.log(YT_DATA[1]);
        const embed = new Discord.RichEmbed()
            .setTitle("Search results | "+global.searched)
            .setAuthor(message.author.username, message.author.avatarURL)
            /*
            * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
            */
            .setColor(0x00AA00)
            //.setDescription("This is the main body of text, it can hold 2048 characters.")
            .setFooter('MK', prof_pic)
            //.setImage("http://i.imgur.com/yVpymuV.png")
            //.setThumbnail("http://i.imgur.com/p2qNFag.png")
                /*
                * Takes a Date object, defaults to current date.
                */
            .setTimestamp()
            .setURL("\nhttps://www.youtube.com/watch?v=" + YT_DATA[0].id.videoId)
            .addBlankField(true)
            .addField('1) ' + YT_DATA[0].snippet.title,
                    YT_DATA[0].snippet.description+"https://www.youtube.com/watch?v=" + YT_DATA[0].id.videoId)
            .addBlankField(true)
                /*
                * Inline fields may not display as inline if the thumbnail and/or image is too big.
                */
            .addField("2) " + YT_DATA[1].snippet.title, 
                    YT_DATA[1].snippet.description+"https://www.youtube.com/watch?v=" + YT_DATA[1].id.videoId)
                /*
                * Blank field, useful to create some space.
                */
            .addBlankField(true)
            .addField("3) " + YT_DATA[2].snippet.title, 
                    YT_DATA[2].snippet.description+"https://www.youtube.com/watch?v=" + YT_DATA[2].id.videoId)
        
            .addBlankField(true)
            .addField("4) " + YT_DATA[3].snippet.title, 
                    YT_DATA[3].snippet.description+"https://www.youtube.com/watch?v=" + YT_DATA[3].id.videoId)
        
            .addBlankField(true)
            .addField("5) " + YT_DATA[4].snippet.title, 
                    YT_DATA[2].snippet.description+"https://www.youtube.com/watch?v=" + YT_DATA[4].id.videoId);
      
        message.channel.send({embed});
        var yt_link = "1) https://www.youtube.com/watch?v=" + YT_DATA[0].id.videoId
                      "\n2) https://www.youtube.com/watch?v=" + YT_DATA[1].id.videoId
                      "\n3) https://www.youtube.com/watch?v=" + YT_DATA[2].id.videoId
                      "\n4) https://www.youtube.com/watch?v=" + YT_DATA[3].id.videoId
                      "\n5) https://www.youtube.com/watch?v=" + YT_DATA[4].id.videoId;
        //console.log(yt_link);
        //message.channel.send(yt_link);
        message.channel.send("`**Now use !yt-play URLHERE to add it to playlist. NOTE - You must be in a voice channel**`");
        //console.log(YT_DATA);
    }
  
    client.user.setPresence({game: {name: " !help | Servers: " + client.guilds.size, type: 0}});
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
 
   async function plz(person, col) {
      const image = person.displayAvatarURL;
      const png = image.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=128');
      const { body } = await snek.get(png);
      //console.log(col);
      const size = new Canvas(130, 84)
        .setTextFont('700 32px Roboto')
        .measureText(person.username);
      const newSize = size.width < 130 ? 130 : size.width + 20;
      return new Canvas(newSize, 84)
        .addImage(body, 0, 0, newSize, 84)
        .setTextFont('700 32px Roboto')
        .setColor('#FFAE23')
        .setTextBaseline('top')
        .setTextAlign('center')
        .addText('Level Up !', newSize/2, 45)
        .setColor('#49FF00')
        .setTextBaseline('top')
        .setTextAlign('center')
        .addText(person.username, newSize/2, 5)
        .toBuffer();
    };
    
    async function go() {
        const person = message.author;
        console.log(message.author.avatarURL);
        const result = await plz(person, '#000000');
        await message.channel.send({files: [{attachment: result, name: 'pls.png'}]});
    };
    
    //go();
  
    //POINTS HERE
    var money;
    
    const updateMoney = async function(message, amount = 0) {
      let newTime = Date.now()+86400000; //24 Hours
      console.log(newTime);
      await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+message.author.id}"`).then (row => {
        //message.channel.send(row.money);
        if (!row) {
          sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id + message.author.id, amount, newTime]);
          //message.channel.send('new');
        } else {
          sql.run(`UPDATE money SET money = ${row.money + amount}, daily = ${row.daily} WHERE ID = "${message.guild.id+message.author.id}"`);
          //message.channel.send('Update');
        }
      }).catch(() => {
        console.error;
        sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
          sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id + message.author.id, amount, newTime]);
        });
      });
    }
    if (Math.floor(Math.random() * 5) == 2) updateMoney(message, 5);
    //getMoney(message);
    
    const updatePoints = async function(message, amount=1) {
      await sql.get(`SELECT * FROM scores WHERE userId = "${message.guild.id+message.author.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id+message.author.id, amount, 0]);
          return("Success");
          //console.log('new');
        } else {
          //console.log('update');
          let curLevel = Math.floor(0.35 * Math.sqrt(row.points + 1));
          //console.log(Math.floor(0.35 * Math.sqrt(row.points + 1)));
          if (curLevel > row.level) {
            //console.log('update');
            row.level = curLevel;
            sql.run(`UPDATE scores SET points = ${row.points + amount}, level = ${row.level} WHERE userId = "${message.guild.id+message.author.id}"`);
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
          }
          sql.run(`UPDATE scores SET points = ${row.points + amount}, level = ${row.level} WHERE userId = "${message.guild.id+message.author.id}"`);
        }
    }).catch(() => {
        console.error;
        //console.log('new t');
        return sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
            sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id+message.author.id, amount, 0]);
            return("Success");
        });
    });
    };
  
  if (message.channel.type != 'dm') updatePoints(message);
  
  //////////////////
  //COMMANDS BELOW//
  //////////////////
  
    switch (command) {
        case 'coin': 
            coin_command.coin(args, message);
            break;
        case "8ball" :
            if (args[0] == undefined) {
              message.channel.send("**8Ball** | No questions provided !");
              break;
            }
            var random = Math.floor(Math.random() * eight_ball.length);
            message.channel.send("**8Ball** | "+eight_ball[random]);
            break;
        case "yt-stop" :
            try {
              voiceChannel.leave();
              message.channel.send("**yt-stop** | "+"Stopped Music");
            } catch (err) {
              message.channel.send("**yt-stop** | "+"Nothing is playing right now");
            }
            break;
        case "yt-play" :
            var link = args[0];
            if (!link.startsWith("https://www.youtube.com/watch?v=")) {
                message.channel.send("**yt-play** | That's not a valid youtube.com video link example link:\nhttps://www.youtube.com/watch?v=ABCDEFGHIJKL");
                break;
            } else {
                //message.channel.send("Valid Link");
                if (!voiceChannel) {
                  message.channel.send("**yt-play** | You are not in a voice channel to play this music !");
                  break;
                } else {
                  //PLAY MUSIC
                  if (!ytdl.validateURL(link)) {
                    message.channel.send("**yt-play** | invalid Youtube video");
                    break;
                  }
                  
                  var id = ytdl.getURLVideoID(link);
                  var broken;
                  ytdl.getInfo(id,  (err, info) => {
                    if (err) {
                      console.log(err);
                      message.channel.send("**yt-play** | invalid Youtube video");
                      var broken = true;
                    } else {
                      var broken = false;
                    }
                    if (!broken) {
                      //console.log(info.title);
                      message.channel.send("Playing: **" + info.title+"**");
                      message.channel.send("Uploded by: **" + info.author.name+"**");
                      var hours = Math.floor((info.length_seconds/60)/60);
                      
                      var minutes = Math.floor(info.length_seconds/60);
                      
                      var seconds = Math.floor(info.length_seconds - minutes*60);
                      //if (minutes < 10) var minutes = "0"+minutes;
                      if (seconds < 10) var seconds = "0"+seconds;
                      //console.log(hours);
                      //console.log(minutes);
                      //console.log(seconds);
                      message.channel.send("Duration: **" + minutes + ":" + seconds+"**");
                      //console.log('rating:', info.average_rating);
                      //console.log('uploaded by:', info.author.name);
                    }
                  });
                  if (broken) {
                    message.channel.send("**yt-play** | Broken link - "+link);
                    break;
                  }
                  try {
                    voiceChannel.leave();
                  } catch (err) {
                    message.channel.send("**yt-play** | Stopping current music to play new music !");
                  }
                  
                  try {
                    voiceChannel.join()
                      .then(connection => {
                        const stream = ytdl(link, { filter: 'audioonly' });
                        const dispatcher = connection.playStream(stream);
                        dispatcher.on('end', () => {
                          voiceChannel.leave();
                        //if (!broken) message.channel.send("Music Finished");
                        });
                    });
                  } catch (err) {
                    message.reply("**yt-play** | Oh No, I cant join you're voice channel\nIs there space ?\nAm i allowed ?");
                  //message.reply("valid");
                  }
               }
            }
            break;
        case "yt-search" :
            //var TEST = se(args.join(' '));
            //var video = JSON.parse(fs.readFileSync("./yt.json"));
            //message.channel.send(TEST);
            search(args.join(' '));
            message.channel.send("Now use !yt-play URLHERE to play music");
            break;
        case "respect" :
            break;
        case "follow" :
            follow_command.follow(message);
            break;
        case "level" :
            var person = message.author.displayAvatarURL;
            var user = (message.author.tag)
            level_command.getProfile(message, user, person, sql);
            break;
        case "announce" :
            message.guild.channels.find("name", "announcments").sendMessage(args.join(' '));
            break;
        case "daily" :
            money_command.daily(message, sql);
            break;
        case "money" :
            money_command.getMoney(message, sql);
            break;
        case "ping" :
            message.channel.send('Pong!');
            break;
        case "stats" :
            stats_command.getStats(client, message);
            break;
        case "setrole" :
            role_command.set(message);
            break;
        case "remrole" :
            role_command.rem(message);
            break;
        case "ban" :
            ban_command.ban(args, message);
            break;
        case "kick" :
            kick_command.kick(args, message);
            break;
        case "purge" :
            purge_command.purge(client, args, message);
            break;
        case "reboot":
            if (message.author.id != ownerID) {
              message.channel.send('**reboot **| You cannot reboot me, HA HA HA');
              break;
            }
            reboot(message);
            break;
        case "credits" :
            help_command.credits(message);
            break;
        case "help" :
            help_command.help(message);
            break;
        case 'support' :
            support_command.support(message, client);
            break;
        case "quote" :
            //quotes now stored in quotes.json
            //267 quotes
            var randomAnswer = quotes[Math.floor(Math.random() * quotes.length)];
            message.channel.send('```' + randomAnswer + '```');
            break;
        case "joke":
            joke_command.joke(client, message);
            break;
        case "eval" :
            if(message.author.id !== ownerID) {
               message.channel.send('**eval ** |You are not @Jackthehaxk21#8860, You cannot use eval');
              break;
            } else {
               try {
                   const code = args.join(" ");
                   let evaled = eval(code);

                   if (typeof evaled !== "string")
                       evaled = require("util").inspect(evaled);

                   message.channel.send(clean(evaled), {code:"xl"});
              } catch (err) {
                   try{
                     message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
                   } catch(err) {
                     message.channel.send('**eval** | MAJOR ERROR'); 
                   }
              } 
           }
           break;
            
        default:
            message.channel.send("**MK** | Unkown command use !help\nTo get a list of available commands.")
            break;
    }
    if (startup === 1) {
        startup = 0;
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);