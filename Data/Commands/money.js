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
       try {
         let data = client.points.get(guyID.id);
         data.money += m;
         client.points.set(guyID.id, data);
         message.channel.send('**OVERIDE **| 🏦 | You\'ve given '+guyID.user.username+' $'+m);
         message.channel.send('**OVERIDE **| 🏦 | '+guyID.user.username+' now has $'+(parseInt(data.money)+m));
         return;
       } catch (err) {
         let data = require('../../points.json');
         data.money += m;
         data.daily = newTime;
         client.points.set(guyID.id, data);
         message.channel.send('**OVERIDE **| 🏦 | You\'ve given '+guyID.user.username+' $'+m);
         message.channel.send('**OVERIDE **| 🏦 | '+guyID.user.username+' now has $'+m);
         return;
       }
  }
}

module.exports = methods;