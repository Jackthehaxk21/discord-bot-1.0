const methods = { 
  run: function(client, args, message){
    if (!message.channel.nsfw) return message.channel.send("🔞" + " Cannot display NSFW content in a SFW channel.");
    const randomPuppy = require('random-puppy');
    const request = require('snekfetch');
    const fs = require("fs") 
    var subreddits = [
        'pussy',
        'rearpussy',
        'simps',
        'vagina',
        'MoundofVenus',
        'PerfectPussies',
        'spreading'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
    randomPuppy(sub).then(url => {
      message.channel.send({ embed: { title: 'Pussy', image: { url: url }} });
    })
  }
}

module.exports = methods;