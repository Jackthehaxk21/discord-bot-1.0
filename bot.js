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
    var channel = client.channels.find("name", 'bot');
    channel.send("Hello @everyone , I am now ready !");
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    switch (command) {
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
            let check = 0;
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
            let member = message.mentions.members.first();
            let role = message.mentions.roles.first();
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
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if(!message.member.hasPermission("MANAGE_MEMBERS"))
                message.reply("Sorry, you don't have permissions to use this!");
                break;
            // Let's first check if we have a member and if we can kick them!
            // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
            let user = message.mentions.members.first();
            if(!user)
                message.reply("Please mention a valid member of this server");
                break;
            if(!user.kickable) 
                message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
                break;
            // slice(1) removes the first part, which here should be the user mention!
            let reason = args.slice(1).join(' ');
            if(!reason)
                message.reply("Please indicate a reason for the kick!");
                break;
            // Now, time for a swift kick in the nuts!
            await user.kick(reason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
            
            message.reply(`${user.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
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
