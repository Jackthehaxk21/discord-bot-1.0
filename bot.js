const fs = require("fs");
const fsn = require('fs-nextra');
const snek = require('snekfetch');
const Discord = require('discord.js');
const { resolve, join} = require('path');
const { Canvas } = require('canvas-constructor');
const sql = require('sqlite');

const client = new Discord.Client();

const glitchHandler = require('./Data/Functions/glitch.js');
const commandHandler = require('./Data/Commands/handler.js');

const onReady = require('./Data/Functions/clientOn/ready.js');
const onMessage = require('./Data/Functions/clientOn/message.js');
const onGuildCreate = require('./Data/Functions/clientOn/guildCreate.js');
const onGuildMemberAdd = require('./Data/Functions/clientOn/guildMemberAdd.js');
const onGuildMemberRemove = require('./Data/Functions/clientOn/guildMemberRemove.js');

sql.open("./Data/Data.sqlite");

//KEEP BOT ONLINE BY PINGING WEBSITE EVERY 4-5 MINUTES
/////////////////////////////
glitchHandler.run(); ////////
/////////////////////////////

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));

const prefix = "mk!";

client.on("guildMemberAdd", (member) => {onGuildMemberAdd.run(member);});

client.on("guildMemberRemove", (member) => {onGuildMemberRemove.run(member);});

client.on("guildCreate", guild => {onGuildCreate.run(guild, client);});

client.on('ready', () => {onReady.run(client, prefix);});

client.on('message', message => {onMessage.run(client, message, prefix, Discord, sql);});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);