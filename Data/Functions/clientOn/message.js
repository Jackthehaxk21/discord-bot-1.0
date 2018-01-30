let methods = {
  run : async function(client, message, Discord) {
    //if(message.content != message.author.id) message.channel.send(message.author.id);
    let settings = require('../../../settings.json');
    var i = await client.announcments.indexOf(message.guild.id);
      
    if(message.guild.id == client.announcments[i]) {
      //message.channel.send("ready")
      //delete client.announcments[message.guild.id]
      if(i != -1) {
        //message.channel.send("test");
	      await client.announcments.splice(i, 1);
      }
      
      try {
        await message.guild.channels.find("name", client.settings.get(message.guild.id).systemNoticeChannel).send(client.announcment);
      } catch (err) {
        message.channel.send("**Oh No !**\nYou missed a bot **Announcement** change the `systemNoticeChannel` setting to get the next Announcement !\nP.S use `@Jackthehack settings edit systemNoticeChannel CHANNEL-NAME`");
      }
    }
    //INSERT NEW PREFIX HERE
    let prefix;
    try {
      prefix = client.settings.get(message.guild.id).prefix;
    } catch (err) {
      client.settings.set(message.guild.id, settings);
      prefix = client.settings.get(message.guild.id).prefix
    }
    
    if(prefix == 'Undefined' || prefix == undefined) {
      client.settings.set(message.guild.id, settings);
      prefix = client.settings.get(message.guild.id).prefix
    }
    
    
    
    const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
    prefix = prefixMention.test(message.content) ? message.content.match(prefixMention)[0] + " " : prefix;
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    
    
    
    //message.channel.send(prefix)
   // if(prefix);
    //console.log(prefix);
    //console.log("after");
    if(message.author.bot && message.author.id != 395520567815569409) return;
    client.user.setPresence({game: {name: " @Jackthehack help | Guilds: " + client.guilds.size, type: 0}});
    const moneys = require('../../../Data/Commands/money.js');
    const levels = require('../../../Data/Commands/level.js');
    const commandHandler = require('../../../Data/Commands/handler.js');
    const log = async function(client, command) {
      if (message.author.id != process.env.ownerID) {
        var MK = client.guilds.get("393114138135625749")
        //console.log(MK);
        var MK = MK.channels.find("name", "bot-log");
        let msg = await MK.send('[**'+message.author.tag+'**] | Command: **'+command+'**');
        msg.edit('[**'+(msg.createdAt).toString().replace(' GMT+0000 (UTC)','')+'**] [**'+message.guild.name+'**] [**'+message.author.tag+'**] | Command: **'+command+'**');
        console.log('['+message.author.tag+'] | Command: '+command);
        return;
      }
      return;
    }
    if (message.content.toLowerCase().startsWith(prefix+'money') ) {
      log(client, 'Money');
      moneys.get(client, message);
      return;
    }
    if (message.content.toLowerCase().startsWith(prefix+'daily') ) {
      log(client, 'Daily');
      moneys.daily(client, message);
      return
    }
    if (message.content.toLowerCase().startsWith(prefix+'level') ) {
      log(client, 'Level');
      levels.get(client, message);
      return;
    }
    
    let newTime = Date.now()+86400000
    
    const updateMoney = async function(message, amount = 0) {
    try {
      let data = client.points.get(message.author.id)
      data.money += amount;
      data.daily = newTime;
      client.points.set(message.author.id, data);
      return;
    } catch (err) {
      const set = require('../../../points.json');
      let data = set;
      data.money += amount;
      data.daily = newTime;
      client.points.set(message.author.id, data);
      return;
    }
    }
    if (Math.floor(Math.random() * 5) == 2) updateMoney(message, 5);
    
    const updatePoints = async function(message, amount=1) {
    try {
      let data = client.points.get(message.author.id);
      data.points += amount;
      let curLevel = Math.floor(0.35 * Math.sqrt(data.points + 1));
      if (curLevel > data.level) {
        //level up
        data.level += 1;
        if (client.settings.get(message.guild.id).levelUpMessageOn == "true" || client.settings.get(message.guild.id).levelUpMessageOn == "True") {
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        }
      }
      client.points.set(message.author.id, data);
    } catch(e) {
      let newTime = Date.now();
      let data = require('../../../points.json');
      data.points += amount;
      data.daily = newTime;
      let curLevel = Math.floor(0.35 * Math.sqrt(data.points + 1));
      /*if (curLevel > data.level) {
        //level up
        data.level += 1;
        if (client.settings.get(message.guild.id) == "true" || client.settings.get(message.guild.id) == "True") {
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        }
      }*/
      client.points.set(message.author.id, data);
    
    }
    }
  //prefix = client.settings.get(message.guild.id).prefix;
  if (message.channel.type != 'dm') updatePoints(message);
  commandHandler.handle(client, message, prefix, Discord);
  return;
  }
}

module.exports = methods;