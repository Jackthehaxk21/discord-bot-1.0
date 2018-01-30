var methods = {
  get: async function(client, message) {
       //message.channel.send("Sorry but the social commands are down for repair\nVery sorry for any inconvienve caused.");
       //return;
       let newTime = Date.now();
       try {
         let data = client.points.get(message.author.id);
         message.channel.send('🏧 | You have $'+data.money);
         return;
       } catch (err) {
         let data = require('../../points.json');
         data.daily = newTime;
         client.points.set(message.author.id, data);
         message.channel.send('🏧 | You have $0 ');
       }
  },
  
  daily : async function(client, message) {
       //message.channel.send("Sorry but the social commands are down for repair\nVery sorry for any inconvienve caused.");
       //return;
       let newTime = Date.now()+86400000;
       try {
         let data = client.points.get(message.author.id)
         if(data.daily <= Date.now()) {
           data.money += 100
           data.daily = newTime;
           message.channel.send('🏧 | You\'ve claimed your $100, come back in 24 hours for more !!');
          return;
         } else {
           message.channel.send('🏧 | Please wait '+(Math.floor((((Date.now()-data.daily)/1000)/60)/60))+'- Hours.');
           return;
         }
       } catch (err) {
         let data = require('../../points.json');
         data.money += 100;
         data.daily = newTime;
         message.channel.send('🏧 | You\'ve claimed your $100, come back in 24 hours for more !!');
         client.points.set(message.author.id, data);
         return;
       }
  },
  
  owner: async function(client, args, message) {
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