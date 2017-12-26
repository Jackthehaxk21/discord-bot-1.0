const Discord = require('discord.js');
const client = new Discord.Client();
var startup = 0;
const fs = require("fs");
const quotes = require("./Data/Quotes.json");
const http = require('http');
const express = require('express');
const app =  express();
const ytdl = require('ytdl-core');
const yss = require('youtube-simple-search');
const sql = require("sqlite");
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
sql.open("./Data/score.sqlite");

//commands
const role_command = require('./Data/Commands/role.js');
const kick_command = require('./Data/Commands/kick.js');
const coin_command = require('./Data/Commands/coin.js');
const help_command = require('./Data/Commands/help.js');
const purge_command = require('./Data/Commands/purge.js');

var ownerID= "282819886198030336";
let prof_pic = "https://d30y9cdsu7xlg0.cloudfront.net/png/927902-200.png"
var eight_ball = require("./Data/8Ball.json");
//const search = require('youtube-search');
const key = process.env.YT_KEY; 
var yt_link = [];


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


async function reboot(message) {
    await message.channel.send('**reboot **| Rebooting...');
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
  const guild = member.guild;
  const defaultChannel = guild.channels.find("name", "bot-log");
  defaultChannel.send("Welcome our new user!\n" + member.user);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const defaultChannel = guild.channels.find("name", "bot-log");
  defaultChannel.send("Oh No, It looks like " + member.user + " left us !");
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
    client.channels.find("name", "bot-log").sendMessage("Im now online !");
});

client.on('message', message => {
    console.log(message.guild.id + ' ' + message.guild.name);
    client.user.setPresence({game: {name: " !help | Servers: " + client.guilds.size, type: 0}});
    let voiceChannel = message.member.voiceChannel;

    function search(text) {
        global.searched = text;
        yss( {key: key, query: text, maxResults: 5}, callback );
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
                    YT_DATA[0].snippet.description + "\nhttps://www.youtube.com/watch?v=" + YT_DATA[0].id.videoId)
            .addBlankField(true)
                /*
                * Inline fields may not display as inline if the thumbnail and/or image is too big.
                */
            .addField("2) " + YT_DATA[1].snippet.title, 
                    YT_DATA[1].snippet.description + "\nhttps://www.youtube.com/watch?v=" + YT_DATA[1].id.videoId)
                /*
                * Blank field, useful to create some space.
                */
            .addBlankField(true)
            .addField("3) " + YT_DATA[2].snippet.title, 
                    YT_DATA[2].snippet.description + "\nhttps://www.youtube.com/watch?v=" + YT_DATA[2].id.videoId)
        
            .addBlankField(true)
            .addField("4) " + YT_DATA[3].snippet.title, 
                    YT_DATA[3].snippet.description + "\nhttps://www.youtube.com/watch?v=" + YT_DATA[3].id.videoId)
        
            .addBlankField(true)
            .addField("5) " + YT_DATA[4].snippet.title, 
                    YT_DATA[2].snippet.description + "\nhttps://www.youtube.com/watch?v=" + YT_DATA[4].id.videoId);
      
        message.channel.send({embed});
        var yt_link = ["https://www.youtube.com/watch?v=" + YT_DATA[0].id.videoId,
                        "https://www.youtube.com/watch?v=" + YT_DATA[1].id.videoId,
                        "https://www.youtube.com/watch?v=" + YT_DATA[2].id.videoId,
                        "https://www.youtube.com/watch?v=" + YT_DATA[3].id.videoId,
                        "https://www.youtube.com/watch?v=" + YT_DATA[4].id.videoId];
        console.log(yt_link);
        message.channel.send("**Now use !yt-add <NUMBER> to add it to playlist. NOTE - You must be in a voice channel**");
        //console.log(YT_DATA);
    }
  
    client.user.setPresence({game: {name: " !help | Servers: " + client.guilds.size, type: 0}});
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
 
   async function plz(person) {
      const size = new Canvas(130, 84)
        .measureText(person.displayName);
      const newSize = size.width < 130 ? 130 : size.width + 20;
      return new Canvas(newSize, 84)
        .setColor('#B93F2C')
        .setTextBaseline('top')
        .setTextAlign('center')
        .addText('pls', newSize/2, 45)
        .setColor('#F01111')
        .setTextBaseline('top')
        .setTextAlign('center')
        .addText(person.displayName, newSize/2, 5)
        .toBuffer();
    };
    
    //const result = plz(message.member);
    //message.channel.send({files: [{attachment: result, name: 'pls.png'}]});
    async function go() {
        const person = message.mentions.members.first() || message.member;
        const result = await plz(person);
        await message.channel.send({files: [{attachment: result, name: 'pls.png'}]});
    };
    go();
    //POINTS HERE
  
     sql.get(`SELECT * FROM scores WHERE userId =${message.guild.id +'.'+ message.author.id}`).then(row => {
        if (!row) {
          console.log('new');
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id +'.'+ message.author.id, 1, 0]);
        } else {
          console.log('update');
          let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
          if (curLevel > row.level) {
            row.level = curLevel;
            sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.guild.id +'.'+ message.author.id}`);
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
          }
          sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.guild.id +'.'+ message.author.id}`);
        }
    }).catch(() => {
        console.error;
        console.log('new t');
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
            sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id +'.'+ message.author.id, 1, 0]);
        });
    });

  
  
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
        case "yt-add" :
            console.log(yt_link);
            var yt_que = yt_que + yt_link[args[0]];
            console.log(yt_que);
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
            break;
        case "follow" :
            var role = message.guild.roles.find("name","Follower");
            if (message.member.roles.has(role.id)) {
                message.reply("**follow** | You're already a official Follower !");
                break;
            } else {
                message.member.addRole(role);
                message.reply("**follow** | You are now a official Follower !");
                break;
            }
            break;
        case "level" :
            sql.get(`SELECT * FROM scores WHERE userId ="${message.guild.id +'.'+ message.author.id}"`).then(row => {
                console.log(row);
                if (!row) {
                  message.reply("Your current level is 0");
                  message.channel.send(`Your current level is ${row.level}`);
                  return;
                }
                
                message.channel.send(`Your current level is ${row.level}`);
                //console.log('Level delay');
                sql.get(`SELECT * FROM scores WHERE userId ="${message.guild.id +'.'+ message.author.id}"`).then(row => {
                    if (!row) return message.reply("sadly you do not have any points yet!");
                    message.channel.send(`and ${row.points} points, good going!`);
                });
            });
            //message.reply("You are currently level " + userData.level + ", with " + userData.points + " points.");
            break;
        case "embed" :
            if (message.author.id != ownerID) break;
            const embed = new Discord.RichEmbed()
                .setTitle("This is your title, it can hold 256 characters")
                .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
                /*
                * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                */
                .setColor(0x00AE86)
                .setDescription("This is the main body of text, it can hold 2048 characters.")
                .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
                .setImage("http://i.imgur.com/yVpymuV.png")
                .setThumbnail("http://i.imgur.com/p2qNFag.png")
                /*
                * Takes a Date object, defaults to current date.
                */
                .setTimestamp()
                .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                .addField("This is a field title, it can hold 256 characters",
                    "This is a field value, it can hold 2048 characters.")
                /*
                * Inline fields may not display as inline if the thumbnail and/or image is too big.
                */
                .addField("Inline Field", "They can also be inline.", true)
                /*
                * Blank field, useful to create some space.
                */
                .addBlankField(true)
                .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

            message.channel.send({embed});
            break;
        /*case "announce" :
            message.guild.channels.find("name", "announcments").sendMessage(args[0]);
            break;*/
        case "ping" :
            message.channel.send('Pong!');
            //console.log("Pinged.");
            break;
        case "test" :
            try {
              message.channel.send(args[0]);
              message.channel.send(args[1]);
              message.channel.send(args[2]);
            } catch (e) {
              //message.channel.send(e.toString());
              console.log("test error DW");
            }
            break;
        case "setrole" :
            role_command.set(args, message);
            break;
        case "removerole" :
            message.channel.send("test");
            break;
        case "kick" :
            kick_command.kick(args, message);
            break;
        case "purge" :
            purge_command.purge(client, args, message);
            break;
        case "reboot":
            if (message.author.id != ownerID) break;
            reboot();
            //message.channel.send('**reboot **| Rebooting...');
            console.log('Reboot Requested');
            //console.log('Reboot Requested');
            process.exit();
            break;
        case "help" :
            //!help PAGENUMBER
            help_command.help(Discord, prof_pic, args, message);
            break;
        case "quote" :
            //quotes now stored in quotes.json
            //267 quotes
            var randomAnswer = quotes[Math.floor(Math.random() * quotes.length)];

            message.channel.send('`' + randomAnswer + '`');
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
                     message.channel.send('**eval** | MAJOR ERROR ln-466 in bot.js'); 
                   }
              } 
           }
           break;
            
        default:
            message.channel.send("**MK** | Unkown command use !help\nTo get a list of available commands.")
            break;
    }
    //message.reply(message.content)
    
    if (startup === 1) {
        startup = 0;
    }
    /*
    if (message.content === "!loop") { 
      var interval = setInterval (function () {
        message.channel.send("Thank you for using me !")
      }, 60 * 60000);
    }*/
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);