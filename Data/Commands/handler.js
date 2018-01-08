const methods = {
  handle : function(client, message, prefix, Discord, sql) {
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    
    //functions
    const ban_command = require('./ban.js');
    const say_command = require('./say.js');
    const kick_command = require('./kick.js');
    const role_command = require('./role.js');
    const coin_command = require('./coin.js');
    const help_command = require('./help.js');
    const joke_command = require('./joke.js');
    const ping_command = require('./ping.js');
    const neko_command = require('./neko.js');
    const eval_command = require('./eval.js');
    const dice_command = require('./dice.js');
    const slots_command = require('./slots.js');
    const quote_command = require('./quote.js');
    const stats_command = require('./stats.js');
    const purge_command = require('./purge.js');
    const level_command = require('./level.js');
    const money_command = require('./money.js');
    const usage_command = require('./usage.js');
    const reboot_command = require('./reboot.js');
    const ytplay_command = require('./yt-play.js');
    const ytstop_command = require('./yt-stop.js');
    const support_command = require('./support.js');
    const eight_ball_command = require('./8ball.js');
    const ytsearch_command = require('./yt-search.js');
    const sql_command = require('../Functions/sql.js');
    
    const log = async function(client, args, command) {
      if (message.author.id != process.env.ownerID) {
        var MK = client.guilds.get("393114138135625749")
        //console.log(MK);
        var MK = MK.channels.find("name", "bot-log");
        let msg = await MK.send('[**'+message.author.tag+'**] | Command: **'+command+'**');
        msg.edit('[**'+(msg.createdAt).toString().replace(' GMT+0000 (UTC)','')+'**] [**'+message.author.tag+'**] | Command: **'+command+'**');
        console.log('['+message.author.tag+'] | Command: '+command);
        return;
      }
      return;
    }
    
    switch (command.toLowerCase()) {
      case "add":
        log(client, args, "OWNER-MONEY-OVERIDE");
        money_command.owner(client, args, message, sql);
        break;
      case "slots":
        log(client, args, "Slots");
        slots_command.run(client, args, message, sql);
        break;
      case "dice":
        log(client, args, 'Dice');
        dice_command.run(client, args, message);
        break;
      case "say":
        log(client, args, "Say");
        say_command.run(client, args, message);
        break;
      case "ban":
        log(client, args, 'Ban');
        ban_command.ban(client, args, message);
        break;
      case "kick":
        log(client, args, 'Kick');
        kick_command.kick(client, args, message);
        break;
      case "setrole":
        log(client, args, 'SetRole');
        role_command.set(client, args, message);
        break;
      case "remrole":
        log(client, args, 'RemRole');
        role_command.rem(client, args, message);
        break;
      case "coin":
        log(client, args, 'Coin');
        coin_command.flip(client, args, message);
        break;
      case "flip":
        log(client, args, 'Coin');
        coin_command.flip(client, args, message);
        break;
      case "help":
        log(client, args, 'Help');
        help_command.help(client, args, message);
        break;
      case "credits":
        log(client, args, 'Credits');
        help_command.credits(client, args, message);
        break;
      /*case "neko":
        log(client, args, `Neko ${message.channel.nsfw === true ? "[NSFW] 🔞" : ""}`);
        neko_command.run(client, args, message);
        break;*/
      case "joke":
        log(client, args, 'Joke');
        joke_command.get(client, args, message);
        break;
      case "stats":
        log(client, args, 'Stats');
        stats_command.get(client, args, message);
        break;
      case "purge":
        log(client, args, 'Purge');
        purge_command.purge(client, args, message);
        break;
      /*case "money":
        log('Money');
        message.reply(sql_command.getMoney(client, args, message));
        break;*/
      case "ping":
        log(client, args, 'Ping');
        ping_command.ping(client, args, message);
        break;
      case "support":
        log(client, args, 'Support');
        support_command.run(client, args, message);
        break;
      case "usage":
        log(client, args, "Usage");
        usage_command.get(client, args, message, prefix);
        break;
      case "8ball":
        log(client, args, '8-Ball');
        eight_ball_command.run(client, args, message);
        break;
      case "quote":
        log(client, args, 'Quote');
        quote_command.get(client, args, message);
        break;
      case "eval":
        log(client, args, "Eval");
        eval_command.run(client, args, message);
        break;
      case "reboot":
        log(client, args, "Reboot");
        reboot_command.reboot(client, args, message);
        break;
      /*case "yt-play":
        log(client, args, "YouTube-Play");
        ytplay_command.run(client, args, message);
        break;
      case "yt-stop":
        log(client, args, "YouTube-Stop");
        ytstop_command.run(client, args, message);     <== BETA DO NOT ALLOW PUBLIC
        break;
      case "yt-search":
        log(client, args, "YouTube-Search");
        ytsearch_command.run(client, args, message, Discord);
        break;*/
    }
    
  }
}

module.exports = methods;