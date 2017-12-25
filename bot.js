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
var ownerID= "282819886198030336";
let prof_pic = "https://d30y9cdsu7xlg0.cloudfront.net/png/927902-200.png"
var eight_ball = require("./Data/8Ball.json");
//const search = require('youtube-search');
const key = process.env.YT_KEY; 


app.get("/", (request, response) => {
  //console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 250000);

/*var YT_DATA = {};

async function se(text) {
    var tex = await testAll(text);
    return tex;
}

async function testAll(text) {
    //const video1 = await youtube.getVideo("https://www.youtube.com/watch?v=5NPBIwQyPWE");
    //const video2 = await youtube.getVideoByID("5NPBIwQyPWE");
    //const video3 = await youtube.searchVideos("big poppa biggie smalls");
    //const videoArray1 = await youtube.getPlaylist("https://www.youtube.com/playlist?list=PLxyf3paml4dNMlJURcEOND0StDN1Q4yWz");
    //const videoArray2 = await youtube.getPlaylistByID("PLxyf3paml4dNMlJURcEOND0StDN1Q4yWz");
    const video = await youtube.searchVideos(text,5);
    var YT_DATA = await video;
    console.log('---');
    console.log(YT_DATA);
    console.log('---');
    //const data = [video.title.toString(), video.description[0,50].toString(), video.length, video.url.toString()];
    //fs.writeFile("./yt.json", JSON.stringify(video));
    return video;
}*/

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


const prefix = "!";

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const defaultChannel = guild.channels.find("name", "bot-announcments");
  defaultChannel.send("Welcome our new user!\n" + member.user);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const defaultChannel = guild.channels.find("name", "bot-announcments");
  defaultChannel.send("Oh No, It looks like " + member.user + " left us !");
});

client.on('ready', () => {
    //client.user.setGame("with my code...");
    client.user.setPresence({game: {name: " !help | Servers: " + client.guilds.size, type: 0}});
    console.log('I am ready!');
    startup = 1;
    //var channel = client.channels.find("name", 'bot');
    //channel.send("Hello @everyone , I am now ready !");
    client.channels.find("name", "bot-announcments").sendMessage("Hello everyone , Im now online !");
});

client.on('message', message => {
    let YT_DATA = [];
    let voiceChannel = message.member.voiceChannel;

    function search(text) {
        global.searched = text;
        yss( {key: key, query: text, maxResults: 5}, callback );
        //console.log('Search');
    }

    function callback(result) {
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
        message.channel.send("**Now use !yt-play <URL>** ***- You must be in a voice channel***");
        //console.log(YT_DATA);
    }
  
    client.user.setPresence({game: {name: " !help | Servers: " + client.guilds.size, type: 0}});
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    var points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if (!points[message.author.id]) points[message.author.id] = {
      points: 0,
      level: 0
    };
    
    var userData = points[message.author.id];
    userData.points++;
    //message.channel.send(userData.points);
    var curLevel = Math.floor(0.3 * Math.sqrt(userData.points));
    if (curLevel > userData.level) {
      // Level up!
      userData.level = curLevel;
      message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
    }
    
    //if (!message.content.startsWith(prefix)) return;
    //if (message.author.bot) return;

    //if (command == "level") {
    //  message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
    //}
    fs.writeFile("./points.json", JSON.stringify(points), (err) => {
      if (err) {
        console.error(err)
      }
    });
    
  //////////////////
  //COMMANDS BELOW//
  //////////////////
  
    switch (command) {
        case "8ball" :
            if (args[0] == undefined) {
              message.chanell.send("**8Ball** | No questions provided !");
              break;
            }
            var random = Math.floor(Math.random() * eight_ball.length);
            message.channel.send("**8Ball** | "+eight_ball[random]);
            break;
        case "yt-stop" :
            try {
              voiceChannel.leave();
              message.reply("Stopped Music");
            } catch (err) {
              message.reply("Nothing is playing right now");
            }
            break;
        case "yt-play" :
            var link = args[0];
            if (!link.startsWith("https://www.youtube.com/watch?v=")) {
                message.reply("That's not a valid youtube.com video link example link:\nhttps://www.youtube.com/watch?v=ABCDEFGHIJKL");
                break;
            } else {
                //message.channel.send("Valid Link");
                if (!voiceChannel) {
                  message.reply("You are not in a voice channel to play this music !");
                  break;
                } else {
                  //PLAY MUSIC
                  if (!ytdl.validateURL(link)) {
                    message.channel.send("invalid Youtube video");
                    break;
                  }
                  
                  var id = ytdl.getURLVideoID(link);
                  var broken;
                  ytdl.getInfo(id,  (err, info) => {
                    if (err) {
                      console.log(err);
                      message.channel.send("invalid Youtube video");
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
                    message.channel.send("Broken link - "+link);
                    break;
                  }
                  try {
                    voiceChannel.leave();
                  } catch (err) {
                    message.channel.send("Stopping current music to play new music !");
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
                    message.reply("Oh No, I cant join you're voice channel\nIs there space ?\nAm i allowed ?");
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
                message.reply("You're already a official Follower !");
                break;
            } else {
                message.member.addRole(role);
                message.reply("You are now a official Follower !");
                break;
            }
            break;
        case "level" :
            message.reply("You are currently level " + userData.level + ", with " + userData.points + " points.");
            break;
        case "embed" :
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
        case "announce" :
            message.guild.channels.find("name", "announcments").sendMessage(args[0]);
            break;
        case "ping" :
            message.reply('Pong!');
            console.log("Pinged.");
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
            var check = 0;
            //let role = message.guild.roles.find("name", args[1]);
            /*let role = args[1];
            console.log(role.toString());
            console.log(message.guild.roles.find("name",role));
            console.log(role);
            console.log(role.id);
            console.log(message.guild.roles.get(role.toString()));
            break;*/
            //let role = message.guild.roles.find("name",role2.toString());
            //console.log(role);
            //message.channel.send(role);
            var member = message.mentions.members.first();
            var role = message.mentions.roles.first();
            var perms = message.member.permissions;
            var has_perm = message.member.hasPermission("MANAGE_ROLES");
            /*try {
                if(message.member.roles.has(role.id)) {
                    message.channel.send("User already has that role,\nSetRole - Failed.");
                    break;
                }
            } catch (e) {
                //console.log(e);
            }*/
            // Check if a member has a specific permission on the guild!
            
            //message.channel.send(member);
            if (has_perm){
                try {
                    member.addRole(role);
                } catch (e) {
                    message.channel.send("INVALID ROLE");
                    console.log(e);
                    check = 1;
                }
                try {
                    if(member.roles.has(role)) {
                        message.channel.send("SetRole Success !\n"+member.toString()+" was added to "+role.toString());
                        console.log("SetRole");
                    } else {
                        if (check == 0) {
                            message.channel.send("SetRole Success !\n"+member.toString()+" was added to "+role.toString());
                        } else {
                            message.channel.send("SetRole Failed\nMake sure you spelt everything correct");
                        }
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
        case "kick" :
            console.log("kick");
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if(!message.member.hasPermission("MANAGE_MEMBERS")) {
                message.reply("Sorry, you don't have permissions to use this!");
                console.log("no perm");
                break;
            }
            // Let's first check if we have a member and if we can kick them!
            // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
            var toKick = message.mentions.members.first();
            if(!toKick) {
                message.reply("Please mention a valid member of this server");
                console.log("No user");
                break;
            }
            if (!toKick.kickable) {
                console.log("Not kickable");
                message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
                break;
            }
            // slice(1) removes the first part, which here should be the user mention!
            var reason = args.slice(1).join(' ');
            if (!reason) {
                console.log("no reason");
                message.reply("Please indicate a reason for the kick!");
                break;
            }
            // Now, time for a swift kick in the nuts!
            try {
                console.log("Kicking...");
                toKick.kick(reason)
            } catch (e) {
                console.log(e);
                message.reply(`Sorry ${message.author} I couldn't kick because of : ${e}`);
            }
            message.channel.send("`${toKick.user} has been kicked by ${message.author} because: ${reason}`");
            //message.guild.channels.find("name","bot-announcments").send(`@${toKick.user.tag} has been kicked by @${message.author.tag} because: ${reason}`);
            break;
        case "purge" :
            const user = message.mentions.users.first()
            const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);
            var perms1 = message.member.permissions;
            var has_perm1 = message.member.hasPermission("MANAGE_MESSAGES");
            message.reply(has_perm1);
            if (!has_perm1) {
              message.reply("Sorry you do not have permission to do that!");
              break;
            }
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
                    const filterBy = user ? user.id : client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                }
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            });
            break;
        case "help" :
            //!help PAGENUMBER
            console.log("help");
            switch (args[0]) {
                case "2":
                    //two
                    message.reply("two");
                    break;
                default:
                    //one
                    if (args[0] > 2) {
                      message.reply("There are only 2 pages of docs");
                      break;
                    }
                    const embed = new Discord.RichEmbed()
                        .setTitle("MK-Bot | Help Page 1/2")
                        .setAuthor("MK-Bot 1.1.2", prof_pic)
                /*
                * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                */
                        .setColor(0x00AE86)
                        .setDescription("Help documentation for 'MK-Bot'\ntype !help <PAGE NUMBER> to access other pages.\n ")
                        .setFooter(`Docs for ${message.author.username}`, message.author.avatarURL)
                        //.setImage("http://i.imgur.com/yVpymuV.png")
                        //.setThumbnail("http://i.imgur.com/p2qNFag.png"
                /*
                * Takes a Date object, defaults to current date.
                */
                        .setTimestamp()
                        //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                        .addField("**===================================**","***Commands with ***§*** mean they're limited to certain users***\n\n")
                        .addField("**!ping**",
                            "*Usage = !ping*\nUsed to ping me to check if im operational !")
                        .addField("**!level**",
                            "*Usage = !level*\nUsed to display you\'re XP and Level")
                        .addField("**!help**", 
                            "*Usage = !help <PAGE NUMBER>*\nDisplay help documentation for MK")
                        .addField("**!test §**", 
                            "*Usage = !test <arg0> <arg1> <arg2>*\nDEBUG ONLY !");

                    message.channel.send({embed});
            
                    break;
            }
            break;
        case "quote" :
            //quotes now stored in quotes.json
            //267 quotes
            var randomAnswer = quotes[Math.floor(Math.random() * quotes.length)];

            message.channel.send('`' + randomAnswer + '`');
            break;
        case "eval" :
            if(message.author.id !== ownerID) {
               message.reply('You are not my creator, You cannot use eval');
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
                     message.reply('Severe error'); 
                   }
              } 
           }
           break;
            
        default:
            message.channel.send("Unkown command use !help\nTo get a list of available commands.")
            break;
    }
    //message.reply(message.content)
    
    if (startup === 1) {
        startup = 0;
    }
    /*if (message.content.startsWith(prefix + 'ping')) {
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
