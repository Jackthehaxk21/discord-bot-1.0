let methods = {
    get : function(client, args, message) {
        //message.channel.send('```asciidoc\n⚠️ | SOME OF THESE CAN BE CONSIDERED NSFW BY SOME, WE HOLD NO RESPONSIBILITY FOR THE JOKES SHOWN | ⚠️```');
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
              console.log('finish')
              message.channel.send('**joke** | ⚠️ | Unable to get joke at this time');
            }
          }
        }
    }
}

module.exports = methods;