const methods = {
  handle : function(client, message, prefix, Discord) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    //must be after trim because of the @ prefix !!
    let data = client.settings.get(message.guild.id);
    prefix = data.prefix;
    if(client.coolDown.has(message.author.id+'-'+message.guild.id)) {
      if(client.coolDown.get(message.author.id+'-'+message.guild.id) <= Date.now()) {
        client.coolDown.delete(message.author.id+'-'+message.guild.id)
        return;
      }
      var time = client.coolDown.get(message.author.id+'-'+message.guild.id);
      message.channel.send(message.author.username+' please dont use me too fast !\nTry again in '+Math.round((time-Date.now())/1000)+' Seconds')
      return;
    }
    if(message.author.id != process.env.ownerID) {
      client.coolDown.set(message.author.id+'-'+message.guild.id, Date.now()+(10000));
      setTimeout(() => {
        //try { msg.delete() } catch(err){console.log(err)}
        client.coolDown.delete(message.author.id+'-'+message.guild.id);
      }, 10000);
    }
    
    const dog_command = require('./dog.js');
    const cat_command = require('./cat.js');
    const ban_command = require('./ban.js');
    const say_command = require('./say.js');
    const test_command = require('./test.js');
    const kick_command = require('./kick.js');
    const role_command = require('./role.js');
    const coin_command = require('./coin.js');
    const help_command = require('./help.js');
    const joke_command = require('./joke.js');
    const ping_command = require('./ping.js');
    const neko_command = require('./neko.js');
    const eval_command = require('./eval.js');
    const dice_command = require('./dice.js');
    const four_k_command = require('./4k.js');
    const slots_command = require('./slots.js');
    const quote_command = require('./quote.js');
    const stats_command = require('./stats.js');
    const purge_command = require('./purge.js');
    const level_command = require('./level.js');
    const money_command = require('./money.js');
    const usage_command = require('./usage.js');
    const boobs_command = require('./boobs.js');
    const pussy_command = require('./pussy.js');
    const remind_command = require('./remind.js');
    const invite_command = require('./invite.js');
    const reboot_command = require('./reboot.js');
    const wanted_command = require('./wanted.js');
    const ytplay_command = require('./yt-play.js');
    const ytstop_command = require('./yt-stop.js');
    const suggest_command = require('./suggest.js');
    const support_command = require('./support.js');
    const eight_ball_command = require('./8ball.js');
    const settings_command = require('./settings.js');
    const ytsearch_command = require('./yt-search.js');
    const user_info_command = require('./user-info.js');
    const server_info_command = require('./server-info.js');
    const fortune_cookie_command = require('./fortune-cookie.js');
    
    const log = async function(client, args, command) {
      if(message.author.id == process.env.ownerID) return;
        var MK = client.guilds.get("393114138135625749")
        //console.log(MK);
        var MK = MK.channels.find("name", "bot-log");
        let msg = await MK.send('[**'+message.author.tag+'**] | Command: **'+command+'**');
        msg.edit('[**'+(msg.createdAt).toString().replace(' GMT+0000 (UTC)','')+'**] [**'+message.guild.name+'**] [**'+message.author.tag+'**] | Command: **'+command+'** | Full Msg: **'+message.content+'**');
        console.log('['+message.author.tag+'] | Command: '+command);
        return;
    }
    
    switch (command.toLowerCase()) {
      case "github":
        if(message.author.id != process.env.ownerID) return;
        message.channel.createWebhook("GitHub", "https://i.imgur.com/p2qNFag.png")
// This will actually set the webhooks avatar, as mentioned at the start of the guide.
.then(webhook => webhook.edit("GitHub", "https://i.imgur.com/p2qNFag.png")
// This will get the bot to DM you the webhook, if you use this in a selfbot,
// change it to a console.log as you cannot DM yourself
.then(wb => message.author.send(`Here is your webhook https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`)).catch(console.error))
        break;
      case "remind":
        log(client, args, "Reminder")
        remind_command.run(client, args, message);
        break;
      case "reminder":
        log(client, args, "Reminder")
        remind_command.run(client, args, message);
        break;
      case "reminders":
        log(client, args, "Reminder")
        remind_command.run(client, args, message);
        break;
      case "userinfo":
        log(client, args, "User Info")
        user_info_command.run(client, args, message);
        break;
      case "serverinfo":
        log(client, args, 'Server Info')
        server_info_command.run(client, args, message);
        break;
      case 'test':
        test_command.run(client, args, message);
        break;
      case "fortune":
        log(client, args, "Fortune Cookie");
        fortune_cookie_command.get(client, args, message);
        break;
      case "settings":
        log(client, args, "Settings");
        settings_command.run(client, args, message);
        break;
      case "wanted":
        log(client, args, "Wanted");
        wanted_command.run(client, args, message);
        break;
      case "suggest":
        log(client, args, "Suggest");
        suggest_command.run(client, args, message, prefix);
        break;
      case "4k":
        log(client, args, '4k');
        four_k_command.run(client, args, message);
        break;
      case "pussy":
        log(client, args, "Pussy");
        pussy_command.run(client, args, message);
        break;
      case "boobs":
        log(client, args, "Boobs");
        boobs_command.run(client, args, message);
        break;
      case "invite":
        log(client, args, "INVITE");
        invite_command.run(client, args, message);
        break;
      case "dog":
        log(client, args, "Dog");
        dog_command.run(client, args, message);
        break;
      case "cat":
        log(client, args, "Cat");
        cat_command.run(client, args, message);
        break;
      case "add":
        log(client, args, "MONEY-OVERIDE");
        money_command.owner(client, args, message);
        break;
      case "slots":
        log(client, args, "Slots");
        slots_command.run(client, args, message);
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
        help_command.help(client, args, message, prefix);
        break;
      case "credits":
        log(client, args, 'Credits');
        help_command.credits(client, args, message);
        break;
      case "neko":
        log(client, args, `Neko ${message.channel.nsfw === true ? "[NSFW] 🔞" : ""}`);
        neko_command.run(client, args, message);
        break;
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
        support_command.run(client, message);
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
        ytstop_command.run(client, args, message);     //<== BETA DO NOT ALLOW PUBLIC
        break;
      case "yt-search":
        log(client, args, "YouTube-Search");
        ytsearch_command.run(client, args, message, Discord);
        break;*/
    }
    
  }
}

module.exports = methods;