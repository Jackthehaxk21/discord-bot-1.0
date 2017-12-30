var methods = {
  getMoney : async function(message, sql) {
       let newTime = Date.now();
       await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+message.author.id}"`).then(row => {
          if (!row) {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
            message.channel.send('**money **| You have $0 money');
            
          } else {
            message.channel.send('**money **| You have $'+row.money);
          }
       }).catch(() => {
          return sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
            message.channel.send('**money **| You have $0 money');
          });
       });
  },
  
  daily : async function(message, sql) {
       let newTime = Date.now()+86400000;
       await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+message.author.id}"`).then(row => {
          if (!row) {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 100, newTime]);
            message.channel.send('**daily **|You\'ve claimed your $100, come back in 24 hours for more !!');
          } else {
            if (row.daily < Date.now()) {
              //message.reply(row.daily);
              //message.reply(Date.now());
              //allowed daily
              sql.run(`UPDATE money SET money = ${row.money + 100}, daily = ${newTime} WHERE ID = "${message.guild.id+message.author.id}"`);
              message.channel.send('**daily **|You\'ve claimed your $100, come back in 24 hours for more !!');
            } else {
            //message.reply(row.daily);
            //message.reply(Date.now());
            message.channel.send('**daily **| Please wait '+(Math.floor((((Date.now()-row.daily)/1000)/60)/60)).toString().replace('-','')+' Hours.');
            }
          }
       }).catch((e) => {
          console.log(e);
          return sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
            sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 100, newTime]);
            message.channel.send('**daily **|You\'ve claimed your $100, come back in 24 hours for more !!');
          });
       });
  }
}

module.exports = methods;

const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "&"

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setGame(`Do &help`)
});

client.on("message", (message) => {
  if (message.content.startsWith(prefix + "ping")) {
    const ping = Math.round(client.ping)
    message.channel.send(`Pong! Heartbeat: \`${ping}ms\``);
  }
  if (message.content.startsWith(prefix + "help"))
  message.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "This is an embed",
      url: "http://google.com",
      description: "This is a test embed to showcase what they look like and what they can do.",
      fields: [{
        name: "Fields",
        value: "They can have different fields with small headlines."
      },
      {
        name: "Masked links",
        value: "You can put [masked links](http://google.com) inside of rich embeds."
      },
      {
        name: "Markdown",
        value: "You can put all the *usual* **__Markdown__** inside of them."
      }],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: ":copyright: Example"
      }
    }
  });
});
client.login("");