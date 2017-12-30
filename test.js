const Discord = require("discord.js");
const client = new Discord.Client();

const random = Math.floor(Math.random()*2);
const prefix = "&"
const coin = ['Heads','Tails'];
client.on("ready", () => {
  console.log("I am ready!");
  client.user.setGame(`Do &help`)
});

client.on("message", (message) => {
  message.author.send('hi');
  if (message.content.startsWith(prefix + "ping")) {
    const ping = Math.round(client.ping)
    message.channel.send(`Pong! Heartbeat: \`${ping}ms\``);
  }
  if (message.content.startsWith(prefix + "help"))
  message.author.send({
    embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Nex Help",
      description: "Nex Help Menu",
      fields: [{
        name: "Moderation",
        value: "Coming Soon"
      },
      {
        name: "Music",
        value: "Coming Soon"
      },
      {
        name: "Fun",
        value: "Coming Soon"
      }],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: ""
      }
    }
  });
  if (message.content.startsWith(prefix + "flip")) {
    const coin = ['Heads','Tails'];
    const random = Math.floor(Math.random()*2);
    message.channel.send("**Coin** | "+coin[random]);
  }
});
