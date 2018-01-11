const methods = {
  run: async function(client, args, message) {
    const snek = require('snekfetch');
    const msg = await message.channel.send(`**MK** is looking for a dog...`);
    const { body } = await snek.get("https://dog.ceo/api/breeds/image/random");
    //console.log(body);
    message.channel.send({ embed: { title: 'Dog', image: { url: body.message } }});
    await msg.delete();
    //message.channel.send(url);
  }
}

module.exports = methods;