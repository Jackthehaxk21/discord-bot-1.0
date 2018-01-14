let methods = {
  run : async function(client, message, prefix, Discord, sql) {
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    if(message.author.bot && message.author.id != 395520567815569409) return;
    client.user.setPresence({game: {name: " "+prefix+"help | Servers: " + client.guilds.size, type: 0}});
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
      moneys.get(message, sql);
      return;
    }
    if (message.content.toLowerCase().startsWith(prefix+'daily') ) {
      log(client, 'Daily');
      moneys.daily(message, sql);
      return
    }
    if (message.content.toLowerCase().startsWith(prefix+'level') ) {
      log(client, 'Level');
      levels.get(message, sql);
      return;
    }
    
    const updateMoney = async function(message, amount = 0) {
      let newTime = Date.now()+86400000; //24 Hours
      await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+message.author.id}"`).then (row => {
        if (!row) {
          sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id + message.author.id, amount, newTime]);
        } else {
          sql.run(`UPDATE money SET money = ${row.money + amount}, daily = ${row.daily} WHERE ID = "${message.guild.id+message.author.id}"`);
        }
      }).catch((e) => {
        //console.log(e);
        sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
          sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id + message.author.id, amount, newTime]);
        });
      });
    }
    if (Math.floor(Math.random() * 5) == 2) updateMoney(message, 5);
  
    const updatePoints = async function(message, amount=1) {
      await sql.get(`SELECT * FROM scores WHERE userId = "${message.guild.id+message.author.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id+message.author.id, amount, 0]);
          return("Success");
        } else {
          let curLevel = Math.floor(0.35 * Math.sqrt(row.points + 1));
          if (curLevel > row.level) {
            row.level = curLevel;
            sql.run(`UPDATE scores SET points = ${row.points + amount}, level = ${row.level} WHERE userId = "${message.guild.id+message.author.id}"`);
            //message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
            return;
          }
          sql.run(`UPDATE scores SET points = ${row.points + amount}, level = ${row.level} WHERE userId = "${message.guild.id+message.author.id}"`);
        }
    }).catch((e) => {
        //console.log(e);
        //console.log('new t');
        return sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
            sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id+message.author.id, amount, 0]);
            return("Success");
        });
    });
    };
  
  if (message.channel.type != 'dm') updatePoints(message);
  commandHandler.handle(client, message, prefix, Discord, sql);
  return;
  }
}

module.exports = methods;