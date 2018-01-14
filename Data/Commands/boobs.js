const methods = {
  run: async function(client, args, message) {
    if (!message.channel.nsfw) return message.channel.send("🔞" + " Cannot display NSFW content in a SFW channel.");
    const snek = require('snekfetch');
    const { body } = await snek.get("http://api.oboobs.ru/boobs/0/1/random");
    message.channel.send({ embed: { title: 'Boobs', image: { url: `http://media.oboobs.ru/${body[0].preview}` } } });
  }
}

module.exports = methods;