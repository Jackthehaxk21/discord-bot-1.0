const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app =  express();
const http = require('http');


//KEEP BOT ONLINE BY PINGING WEBSITE EVERY 4-5 MINUTES
app.get("/", (request, response) => {
  //console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 250000);
//////////////////////////////////////////////////////


const prefix = ">";
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));

client.on('ready', () => {
    client.user.setPresence({game: {name: " ?help | Servers: " + client.guilds.size, type: 0}});
    console.log('I am ready!');
});

client.on('message', message => {
    console.log(message.guild.memberCount);
    client.user.setPresence({game: {name: " ?help | Servers: " + client.guilds.size, type: 0}});
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    var txt = message.content.slice(prefix.length).trim();
    message.author.lastMessage.delete();
    message.channel.send('!'+txt);
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);