let methods = {
    joke : function(client, message) {
        const jokes = require("../Jokes.json");
        var random = jokes[Math.floor(Math.random() * jokes.length)];
        //message.reply(random.body.replace('\n','').replace('\r','').length);
        if (random.body.replace('\n','').replace('\r','').length < 2000) {
          message.channel.send('**'+random.title+'**');
          message.channel.send("```"+random.body+"```");
        } else {
          console.log('1');
          var random = jokes[Math.floor(Math.random() * jokes.length)];
          if (random.body.replace('\n','').replace('\r','').length  < 2000) {
            message.channel.send('**'+random.title+'**');
            message.channel.send("```"+random.body+"```");
          } else {
            console.log('2');
            var random = jokes[Math.floor(Math.random() * jokes.length)];
            if (random.body.replace('\n','').replace('\r','').length  < 2000) {
              message.channel.send('**'+random.title+'**');
              message.channel.send("```"+random.body+"```");
            } else {
              message.channel.send('Unable to get joke at this time');
            }
          }
        }
    }
}

module.exports = methods;