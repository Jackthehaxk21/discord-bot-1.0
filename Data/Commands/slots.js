let methods = {
  run: async function(client, args, message, sql) {
    const start = function(client, args, message) {
      let total = Math.floor(Date.now()/86400000);
      const { SlotMachine, SlotSymbol } = require('slot-machine');
      //🍎🍒🍇💰🎁❔💎♠️♣️♥️♦️
      /*const heart = new SlotSymbol('heart', {
          display: '♥️',
          points: 50,
          weight: 50
      });*/
      const diamond = new SlotSymbol('diamond', {
          display: '💎',
          points: Math.floor(total/3),
          weight: 15
      });

      const box = new SlotSymbol('box', {
          display: '🎁',
          points: Math.floor(Math.random()*200),
          weight: 100
      });
    
      const grape = new SlotSymbol('grape', {
          display: '🍇',
          points: 20,
          weight: 100
      });
    
      const apple = new SlotSymbol('apple', {
          display: '🍎',
          points: 20,
          weight: 100
      });
    
      const cherry = new SlotSymbol('cherry', {
          display: '🍒',
          points: 40,
          weight: 80
      });
 
      const money = new SlotSymbol('money', {
          display: '💰',
          points: 100,
          weight: 30
      });
 
      const wild = new SlotSymbol('wild', {
          display: '❔',
          points: 25,
          weight: 50,
          wildcard: true
      });
 
      const machine = new SlotMachine(3, [diamond, box, grape, apple, cherry, money, wild]);
      const results = machine.play();
 
      var s = results.visualize();
      if(results.winCount == 0) {
        var t = ("**"+message.author.username+" **| Sorry you didn't win anything !\nBetter luck next time");
      } else {
        var t = ("**"+message.author.username+" **| Well done you won $"+results.totalPoints+" !");
      }
      message.channel.send({embed: {
          color: 3447003,
          title: "Slot-Machine",
            fields: [{
              name: "**Jackpot - $"+total*3+"**",
              value: s+"\n"+t
            }],
          timestamp: new Date()
        }
      });
      if(results.winCount != 0) {
        return results.totalPoints;
      } else {
        return 0;
      }
    }
    //start(client, args, message);
       let newTime = Date.now();
       await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+message.author.id}"`).then(row => {
           
          if (!row) {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
            message.channel.send('**slots ** | You have $0, You need $50 to spin. ');
            return;
            
          } else {
            if (parseInt(row.money) >= 50) {
              /*try {
                sql.run(`UPDATE money SET money = ${parseInt(row.money) - 50}, daily = ${row.daily} WHERE ID = "${message.guild.id+message.author.id}"`);
              } catch(e) {
                console.log(e);
              }*/
              let toSet = parseInt(start(client, args, message));
              /*message.channel.send(toSet)
              message.channel.send(toSet-50);
              message.channel.send(500+(toSet-50));*/
                if (toSet >= 50) {
                  sql.run(`UPDATE money SET money = ${parseInt(row.money) + (toSet-50)}, daily = ${row.daily} WHERE ID = "${message.guild.id+message.author.id}"`);
                  return;
                } else {
                  if (toSet == 0) {
                    sql.run(`UPDATE money SET money = ${parseInt(row.money) - 50}, daily = ${row.daily} WHERE ID = "${message.guild.id+message.author.id}"`);
                    return;
                  } else {
                    sql.run(`UPDATE money SET money = ${parseInt(row.money) + (toSet-50)}, daily = ${row.daily} WHERE ID = "${message.guild.id+message.author.id}"`);
                    return;
                  }
                }
              } else {
                message.channel.send('**slots ** | You have $'+row.money+', You need $50 to spin.');
                return;
              }
              return;
          }
       }).catch((e) => {
          console.log(e);
          return sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
            message.channel.send('**slots **| You have $0, You need $50 to spin. ');
            return;
          });
       });
  }
}

module.exports = methods;