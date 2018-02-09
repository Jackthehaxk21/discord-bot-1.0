let methods = {
  run: async function(client, args, message, sql) {
    //message.channel.send("UNDER-GOING A MAJOR FIX")
    //return;
    const start = function(client, args, message) {
      let total = Math.floor((Date.now()/86400000));
      const { SlotMachine, SlotSymbol } = require('slot-machine');
      //🍎🍒🍇💰🎁❔💎♠️♣️♥️♦️
      /*const heart = new SlotSymbol('heart', {
          display: '♥️',
          points: 50,
          weight: 50
      });*/
      const diamond = new SlotSymbol('diamond', {
          display: '💎',
          points: Math.round(total/3),
          weight: 20
      });

      const box = new SlotSymbol('box', {
          display: '🎁',
          points: Math.round(Math.random()*200),
          weight: 80
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
          title: "🎰 Slot-Machine 🎰",
            fields: [{
              name: "**Jackpot - $"+total*3+"**",
              value: s+"\n"+t
            }],
          timestamp: new Date()
        }
      });
      if(parseInt(results.totalPoints) >= total*3) message.channel.send({ embed: { color: 3447003, title: "!!! JACKPOT !!!", image: { url: "https://cdn.dribbble.com/users/423543/screenshots/2104999/win_jackpot.png" }, timestamp: new Date() }});
      if(results.winCount != 0) {
        return results.totalPoints;
      } else {
        return 0;
      }
    }
    //start(client, args, message);
       let newTime = Date.now();
       
       try {
         let data = client.points.get(message.author.id)
         if (parseInt(data.money) >= 100) {
           let toSet = parseInt(start(client, args, message));
           if (toSet >= 100) {
             data.money = parseInt(data.money) + (toSet-100)
           } else {
             if (toSet == 0) {
               data.money = parseInt(data.money) - 100
               return;
             } else {
               data.money = parseInt(data.money) + (toSet-100)
               return;
             }
           }
           client.points.set(message.author.id, data);
         } else {
           message.channel.send('🎰 | You have $'+data.money+', You need $100 to spin.');
           return;
         }
       } catch (err) {
         let data = require('../../points.json');
         client.points.set(message.author.id, data)
         message.channel.send('🎰 | You have $0, You need $100 to spin. ');
         return;
       }
  }
}

module.exports = methods;