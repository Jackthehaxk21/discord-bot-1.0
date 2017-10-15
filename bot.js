const Discord = require('discord.js');
const client = new Discord.Client();
const startup = '0';
client.on('ready', () => {
    console.log('I am ready!');
    startup = '1';
});

client.on('message', message => {
    if (startup === '1') {
        message.channel.send("Booted and ready to use !")
        startup = '0';
    }
    if (message.content === '!ping') {
    	message.reply('pong');
        message.channel.send('Pong!');
        console.log('pinged !')
  	}
    if (message.content === '!help') {
        console.log('help documents have been sent to '+message.author)
        message.reply('Documentation has been sent to you via Private Message (PM)')
        message.author.send("Help Documentation for JACKTHEHACK21 (BOT)")
        message.author.send("------------------------------------------")
        message.author.send("!ping - see how fast it takes me to pong !")
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
