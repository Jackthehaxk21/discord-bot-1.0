var methods = {
  get: async function(message, sql) {
       //message.channel.send("Sorry but the social commands are down for repair\nVery sorry for any inconvienve caused.");
       //return;
       let newTime = Date.now();
       await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+message.author.id}"`).then(row => {
          if (!row) {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
            message.channel.send('🏧 | You have $0 ');
            
          } else {
            message.channel.send('🏧 | You have $'+row.money);
          }
       }).catch((e) => {
          console.log(e);
          return sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
            message.channel.send('🏧 | You have $0 ');
          });
       });
  },
  
  daily : async function(message, sql) {
       //message.channel.send("Sorry but the social commands are down for repair\nVery sorry for any inconvienve caused.");
       //return;
       let newTime = Date.now()+86400000;
       await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+message.author.id}"`).then(row => {
          if (!row) {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 100, newTime]);
            message.channel.send('🏧 | You\'ve claimed your $100, come back in 24 hours for more !!');
          } else {
            if (row.daily < Date.now()) {
              //message.reply(row.daily);
              //message.reply(Date.now());
              //allowed daily
              sql.run(`UPDATE money SET money = ${row.money + 100}, daily = ${newTime} WHERE ID = "${message.guild.id+message.author.id}"`);
              message.channel.send('🏧 | You\'ve claimed your $100, come back in 24 hours for more !!');
            } else {
            //message.reply(row.daily);
            //message.reply(Date.now());
            message.channel.send('🏧 | Please wait '+(Math.floor((((Date.now()-row.daily)/1000)/60)/60))+'- Hours.');
            }
          }
       }).catch((e) => {
          console.log(e);
          sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 100, newTime]);
            message.channel.send('🏧 | You\'ve claimed your $100, come back in 24 hours for more !!');
          });
       });
  },
  
  owner: async function(client, args, message, sql) {
       if(message.author.id != process.env.ownerID) return;
       if(args.length != 2) return;
       let m =  parseInt(args[1]);
       let guyID = await message.mentions.members.first();
       //console.log(guyID);
       let newTime = Date.now();
       await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+guyID.id}"`).then(row => {
          if (!row) {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+guyID.id, m, newTime]);
            message.channel.send('**OVERIDE **| 🏦 | You\'ve given '+guyID.user.username+' $'+m);
            message.channel.send('**OVERIDE **| 🏦 | '+guyID.user.username+' now has $'+(parseInt(row.money)+m));
            
            return;
          } else {
            sql.run(`UPDATE money SET money = ${row.money + parseInt(m)}, daily = ${row.daily} WHERE ID = "${message.guild.id+guyID.id}"`);
            message.channel.send('**OVERIDE **| 🏦 | You\'ve given '+guyID.user.username+' $'+m);
            message.channel.send('**OVERIDE **| 🏦 | '+guyID.user.username+' now has $'+(parseInt(row.money)+m));
            
            return;
            //message.reply(row.daily);
            //message.reply(Date.now());
            //message.channel.send('**daily **|  💳 | Please wait '+(Math.floor((((Date.now()-row.daily)/1000)/60)/60))+'- Hours.');
          }
       }).catch((e) => {
          console.log(e);
          sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+guyID.id, m, newTime]);
            message.channel.send('**OVERIDE **| 🏦 | You\'ve given '+guyID.user.username+' $'+m);
            message.channel.send('**OVERIDE **| 🏦 | '+guyID.user.username+' now has $'+m);
            return;
          });
       });
  }
}

module.exports = methods;