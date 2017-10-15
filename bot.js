const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === '!ping') {
    	message.reply('pong');
        message.channel.send('Pong!');
        console.log('pinged !')
  	}
    if (message.content === '!help') {
        message.author.send("Help Documentation for JACKTHEHACK21 (BOT)")
        message.author.send("------------------------------------------")
        message.author.send("")
        message.author.send("!ping - see how fast it takes me to pong !")
    }
    else {
        message.reply('Uknown Command !')
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
