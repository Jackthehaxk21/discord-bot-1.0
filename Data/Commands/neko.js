let methods = {
  run : async function(client, args, message) {
    const snek = require("snekfetch");
    const { body } = await snek.get(`https://nekos.life/api${message.channel.nsfw === true ? "/lewd" : ""}/neko`);
    if (message.channel.nsfw === true) var ts = '🔞 | NSFW CONTENT | 🔞 ';
    else var ts = '';
    //message.channel.send(message.channel.nsfw)
    message.channel.send({ embed: { title: ts, image: { url: body.neko } } });
  }
}

module.exports = methods;