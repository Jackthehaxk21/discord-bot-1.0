const methods = {
  run: function(client, args, message) {
    if (!message.channel.nsfw) return message.channel.send("🔞" + " Cannot display NSFW content in a SFW channel.");
    const snek = require('snekfetch');
    var max = 12119;
    var min = 10000;
    var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
    var MathLoL = Math.round(MathRan);
    message.channel.send({ embed: { title: 'Boobs - '+MathLoL, image: { url: "http://media.oboobs.ru/boobs_preview/" + MathLoL + ".jpg"}} });
  }
}

module.exports = methods;