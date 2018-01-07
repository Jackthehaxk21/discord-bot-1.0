var methods = {
  get: async function(message, sql) {
       //message.channel.send("Sorry but the social commands are down for repair\nVery sorry for any inconvienve caused.");
       //return;
       let newTime = Date.now();
       await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+message.author.id}"`).then(row => {
          if (!row) {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
            message.channel.send('**money **| 💳 | You have $0 ');
            
          } else {
            message.channel.send('**money **| 💳 | You have $'+row.money);
          }
       }).catch((e) => {
          console.log(e);
          return sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
            message.channel.send('**money **| 💳 | You have $0 ');
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
            message.channel.send('**daily **| 💳 | You\'ve claimed your $100, come back in 24 hours for more !!');
          } else {
            if (row.daily < Date.now()) {
              //message.reply(row.daily);
              //message.reply(Date.now());
              //allowed daily
              sql.run(`UPDATE money SET money = ${row.money + 100}, daily = ${newTime} WHERE ID = "${message.guild.id+message.author.id}"`);
              message.channel.send('**daily **| 💳 | You\'ve claimed your $100, come back in 24 hours for more !!');
            } else {
            //message.reply(row.daily);
            //message.reply(Date.now());
            message.channel.send('**daily **|  💳 | Please wait '+(Math.floor((((Date.now()-row.daily)/1000)/60)/60))+'- Hours.');
            }
          }
       }).catch((e) => {
          console.log(e);
          sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 100, newTime]);
            message.channel.send('**daily **| 💳 | You\'ve claimed your $100, come back in 24 hours for more !!');
          });
       });
  }
}

module.exports = methods;