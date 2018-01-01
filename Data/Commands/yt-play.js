let methods = {
    run : function(client, args, message) {
            const ytdl = require('ytdl-core');
            let voiceChannel;
            if (message.channel.type == 'text') {
              voiceChannel = message.member.voiceChannel;
            }
            try {
              voiceChannel.leave();
            } catch(err) {
              //scdjsafcsd 
            }
            var link = args[0];
            if (!link.startsWith("https://www.youtube.com/watch?v=") && !link.startsWith('https://youtu.be')) {
                message.channel.send("**YouTube** | That's not a valid youtube.com video link example links:\nhttps://www.youtube.com/watch?v=ABCDEFGHIJKL\nhttps://youtu.be/ABCDEFGHIJK");
                return;
            } else {
                //message.channel.send("Valid Link");
                if (!voiceChannel) {
                  message.channel.send("**YouTube** | You are not in a voice channel to play this music !");
                  return;
                } else {
                  //PLAY MUSIC
                  if (!ytdl.validateURL(link)) {
                    message.channel.send("**YouTube** | invalid Youtube videoID");
                    return;
                  }
                  
                  var id = ytdl.getURLVideoID(link);
                  var broken;
                  ytdl.getInfo(id,  (err, info) => {
                    if (err) {
                      //console.log(err);
                      message.channel.send("**YouTube** | invalid Youtube video");
                      var broken = true;
                    } else {
                      var broken = false;
                    }
                    if (!broken) {
                      //console.log(info.title);
                      message.channel.send("Playing: **" + info.title+"**");
                      message.channel.send("Uploded by: **" + info.author.name+"**");
                      
                      var minutes = Math.floor(info.length_seconds/60);
                      
                      var seconds = Math.floor(info.length_seconds - minutes*60);
                      //if (minutes < 10) var minutes = "0"+minutes;
                      if (seconds < 10) var seconds = "0"+seconds;
                      //console.log(hours);
                      //console.log(minutes);
                      //console.log(seconds);
                      message.channel.send("Duration: **" + minutes + " Minutes**");
                      //console.log('rating:', info.average_rating);
                      //console.log('uploaded by:', info.author.name);
                    }
                  });
                  if (broken) {
                    message.channel.send("**YouTube** | Broken link - "+link);
                    return;
                  }
                  try {
                    voiceChannel.join()
                      .then(connection => {
                        const stream = ytdl(link, { filter: 'audioonly' });
                        const dispatcher = connection.playStream(stream);
                        dispatcher.on('end', () => {
                          voiceChannel.leave();
                          //if (!broken) message.channel.send("Music Finished");
                        });
                    });
                  } catch (err) {
                    message.reply("**YouTube** | Oh No, I cant join you're voice channel\nIs there space ?\nAm i allowed ?");
                  //message.reply("valid");
                  }
               }
            }
    }
}

module.exports = methods;