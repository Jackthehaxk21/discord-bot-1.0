let methods = {
  run : async function(client, prefix) {
    //console.log(process.memoryUsage())
    const fs = require('fs')
    client.afk = await JSON.parse(fs.readFileSync("./Data/afk.json", "utf8"));

    client.getAPI = function(req) {
      var ip;
      if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
      } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
      } else {
        ip = req.ip;
      }
      return ip;
    }
    client.sendAPISPAM = async function(txt){
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('LOG | '+txt);
    }
    client.getQuote = async function(){
      const data = require('../../Quotes.json');
      let random = await Math.floor(Math.random()*266);
      let respond = await data[random]
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('API/quote - '+random);
      let dat = respond
      return dat;
    }
    client.getJoke = async function(){
      const data = require('../../Jokes.json');
      let num = await Math.floor(Math.random()*data.length)
      let random = await data[num]
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('API/joke - '+ num);
      return random;
      
    }
    client.getFortune = async function(){
      const data = require('../../fortune-cookie.json');
      let num = await Math.floor(Math.random()*data.length)
      let random = await data[num]
      var MK = client.guilds.get("393114138135625749")
      //console.log(MK);
      var MK2 = MK.channels.find("name", "api-spam");
      MK2.send('API/fortune - '+ num);
      return random;
    }
    
    client.commands = ['4k','8ball','ban','boobs','cat','coin','dice','dog','eval','fortune-cookie','help','credits',
                       'invite','joke','kick','level','money','add','daily','neko','ping','purge','pussy','quote',
                       'reboot','setrole','remrole','say','serverinfo','settings','slots','stats','suggest','support',
                       'test','usage','userinfo','serverinfo','wanted','remind'];
    client.user.setPresence({game: {name: " @Jackthehack help | Servers: " + client.guilds.size, type: 0}});
    console.log('[SYS] | 💻 | I am ready!');
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client);
    client.dreams = ['Test #1','Test #2']
    
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
// Oh look a shortcut to initializing ;)
/*client.dreams = new Enmap({ provider: new EnmapLevel({ name: 'test'}) });

(async function() {
    await client.dreams.defer;
    console.log(client.dreams.size + ' keys loaded (test)');
}());
    */
client.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) });
 
(async function() {
    await client.settings.defer;
    console.log(client.settings.size + ' keys loaded (settings)');
}());
    
// Oh look a shortcut to initializing;)
client.points = new Enmap({ provider: new EnmapLevel({ name: 'points' }) });
 
(async function() {
    await client.points.defer;
    console.log(client.points.size + ' keys loaded (points)');
}());
    
    client.reminders = new Enmap({ provider: new EnmapLevel({ name: 'reminders' }) });
 
(async function() {
    await client.reminders.defer;
    console.log(client.reminders.size + ' keys loaded (reminders)');
}());
    
    
    client.coolDown = new Enmap({ provider: new EnmapLevel({ name: 'coolDown' }) });
 
(async function() {
    await client.coolDown.defer;
    console.log(client.coolDown.size + ' keys loaded (coolDown)');
}());
    
    const http = require('http')
    setInterval(() => {
      http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 250000);
    
    setInterval(() => {
      const toRemind = client.reminders.filter(r => r.reminderTimestamp <= Date.now());
      toRemind.forEach(reminder => {
        client.users.get(reminder.id).send(`You asked me to remind you to: \`${reminder.reminder}\``);
        client.reminders.delete(`${reminder.id}-${reminder.reminderTimestamp}`);
      }); 
    }, 30000); 
    
    setInterval(() => {
      //console.log('ping');
      fs.writeFile("./Data/afk.json", JSON.stringify(client.afk), (err) => {
        if (err) console.error(err)
      });
  }, 15000);
    
    
    
    client.ready = true;    
  }
}

module.exports = methods;