const methods = {
  run: async function(client, args, message) {
    const API = require('./API/image.js');
    const snek = require('snekfetch');
    var url = API.get({
      category: 'cats'
    });
    const msg = await message.channel.send(`**MK** is looking for a cat...`);
    const { body } = await snek.get("http://random.cat/meow");
    //console.log(body);
    message.channel.send({ embed: { title: 'Cat', image: { url: body.file } }});
    await msg.delete();
    //message.channel.send(url);
  }
}

module.exports = methods;