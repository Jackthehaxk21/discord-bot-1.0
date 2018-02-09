const fs = require("fs");
const fsn = require('fs-nextra');
const snek = require('snekfetch');
const Discord = require('discord.js');

const { resolve, join} = require('path');
const { Canvas } = require('canvas-constructor');
//const sql = require('sqlite');

const client = new Discord.Client();
client.ready = false;

const webHandler = require('./web.js');
const commandHandler = require('./Data/Commands/handler.js');

const Idiot = require("idiotic-api");
client.API = new Idiot.Client(process.env.idiotAPI);

const onReady = require('./Data/Functions/clientOn/ready.js');
const onMessage = require('./Data/Functions/clientOn/message.js');
const onGuildCreate = require('./Data/Functions/clientOn/guildCreate.js');
const onGuildDelete = require('./Data/Functions/clientOn/guildDelete.js');
const onGuildMemberAdd = require('./Data/Functions/clientOn/guildMemberAdd.js');
const onGuildMemberRemove = require('./Data/Functions/clientOn/guildMemberRemove.js');

//KEEP BOT WEBSITE RUNNING
/////////////////////////////
webHandler.run(client); ////////  
/////////////////////////////

const send = async function(e,type) {
  var MK = client.guilds.get("393114138135625749")
  console.log(MK);
  var MK = MK.channels.find("name", "bot-log");
  await MK.send('```\n'+type+': \n'+e+'```'); 
}

client.on("error", (e) => {
  console.log("test");
  send(e, "ERROR");
  console.error(e)
});
client.on("warn", (e) => {
  console.log("test");
  send(e, "WARNING");
  console.warn(e)
});
//client.on("debug", (e) => console.info(e));

const prefix = "mkb!";

client.on("test", message => message.reply("test reply"));

client.on("guildMemberAdd", (member) => {onGuildMemberAdd.run(client, member);});

client.on("guildMemberRemove", (member) => {onGuildMemberRemove.run(client, member);});

client.on("guildCreate", guild => {onGuildCreate.run(guild, client, prefix);});

client.on("guildDelete", guild => {onGuildDelete.run(guild, client, prefix);});

client.on('ready', () => {onReady.run(client, prefix);});

client.on('message', message => {onMessage.run(client, message, prefix, Discord);});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);