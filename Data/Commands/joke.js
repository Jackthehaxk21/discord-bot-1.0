let methods = {
    joke : function(client, message) {
        const jokes = require("../Jokes.json");
        var random = jokes[Math.floor(Math.random() * jokes.length)];
        if (random.body < 2000) {
          message.channel.send('**'+random.title+'**');
          message.channel.send("```"+random.body+"```");
          message.channel.send('`ID: '+random.id+'`');
        } else {
          console.log(random.id);
          var random = jokes[Math.floor(Math.random() * jokes.length)];
          message.channel.send('**'+random.title+'**');
          message.channel.send("```"+random.body+"```");
          message.channel.send('`ID: '+random.id+'`');
        }
    }
}

module.exports = methods;