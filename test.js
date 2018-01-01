const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "&"
const coin = ['Heads','Tails'];
client.on("ready", () => {
  console.log("I am ready!");
  client.user.setGame(`Do &help`)
});

client.on("message", (message) => {
  if (message.content.startsWith(prefix + "ping")) {
    const ping = Math.round(client.ping)
    message.channel.send(`Pong! Heartbeat: \`${ping}ms\``);
  }
  if(message.content.startsWith(prefix + "help")){
    message.reply("Check your DMS")
    const help = `
== Help Documents ==

== Fun ==
!coin      ::   Flip a coin.
!8ball     ::   Ask 8ball a question.
!rip       ::   R.I.P someone. <Not functional yet>

== Social ==
!level     ::   Display your XP and Lvl.
!money     ::   Display your $ balance.
!daily     ::   Get daily money ($100).
!donate    ::   Give money to another user.

== General ==
!quote     ::   Get one of 267 quotes.
!joke      ::   Get one of 18'000 jokes.
!follow    ::   Get the role 'Follower'.

== Moderation ==
!kick      ::   Kick user with valid reason (most of the time).
!ban       ::   Ban a user
!purge     ::   Purge messages.
!setrole   ::   Set a role to a user.
!remrole   ::   Remove a role from a user.

== Stats & Help ==
!help      ::   Shows this again.
!stats     ::   Stats for me.
!support   ::   Get support from the people that made me.
!credits   ::   Learn who helped build me from scrap code.

== Bot-Owner ==