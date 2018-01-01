let methods = {
    run : async function(client, args, message, Discord) {
      let prof_pic = "https://d30y9cdsu7xlg0.cloudfront.net/png/927902-200.png";
      const key = process.env.YT_KEY; 
      const yss = require('youtube-simple-search');
      
      function search(text) {
        global.searched = text;
        yss( {key: key, query: text, maxResults: 5}, callback );
        //console.log('Search');
      }
      async function callback(result) {
        let YT_DATA = [];
	      YT_DATA = result;
        //if (YT_DATA[0].snippet.title && YT_DATA[1].snippet.title && YT_DATA[2].snippet.title && YT_DATA[3].snippet.title && YT_DATA[4].snippet.title) message.channel.send('**YouTube** | No results found.');
        //console.log(YT_DATA[0]);
        //console.log(YT_DATA[1]);
        let embed;
        try {
          embed = new Discord.RichEmbed()
            .setTitle("Search results | "+global.searched)
            .setAuthor(message.author.username, message.author.avatarURL)
            /*
            * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
            */
            .setColor(0x00AA00)
            //.setDescription("This is the main body of text, it can hold 2048 characters.")
            .setFooter('MK', prof_pic)
            //.setImage("http://i.imgur.com/yVpymuV.png")
            //.setThumbnail("http://i.imgur.com/p2qNFag.png")
                /*
                * Takes a Date object, defaults to current date.
                */
            .setTimestamp()
            .setURL("\nhttps://www.youtube.com/watch?v=" + YT_DATA[0].id.videoId)
            .addBlankField(true)
            .addField('1) ' + YT_DATA[0].snippet.title,
                    YT_DATA[0].snippet.description)//+"https://www.youtube.com/watch?v=" + YT_DATA[0].id.videoId)
            .addBlankField(true)
                /*
                * Inline fields may not display as inline if the thumbnail and/or image is too big.
                */
            .addField("2) " + YT_DATA[1].snippet.title, 
                    YT_DATA[1].snippet.description)//+"https://www.youtube.com/watch?v=" + YT_DATA[1].id.videoId)
                /*
                * Blank field, useful to create some space.
                */
            .addBlankField(true)
            .addField("3) " + YT_DATA[2].snippet.title, 
                    YT_DATA[2].snippet.description)//+"https://www.youtube.com/watch?v=" + YT_DATA[2].id.videoId)
        
            .addBlankField(true)
            .addField("4) " + YT_DATA[3].snippet.title, 
                    YT_DATA[3].snippet.description)//+"https://www.youtube.com/watch?v=" + YT_DATA[3].id.videoId)
        
            .addBlankField(true)
            .addField("5) " + YT_DATA[4].snippet.title, 
                    YT_DATA[4].snippet.description)//+"https://www.youtube.com/watch?v=" + YT_DATA[4].id.videoId);
          } catch (err) {
            message.channel.send('**YouTube** | No results.'); 
            return;
          }
        
        message.channel.send({embed});
        var yt_link = "1) <https://www.youtube.com/watch?v=" + YT_DATA[0].id.videoId+
                      ">\n2) <https://www.youtube.com/watch?v=" + YT_DATA[1].id.videoId+
                      ">\n3) <https://www.youtube.com/watch?v=" + YT_DATA[2].id.videoId+
                      ">\n4) <https://www.youtube.com/watch?v=" + YT_DATA[3].id.videoId+
                      ">\n5) <https://www.youtube.com/watch?v=" + YT_DATA[4].id.videoId+'>';
        //console.log(yt_link);
        message.channel.send(yt_link);
        message.channel.send("`**Now use !yt-play URLHERE**`");
        //console.log(YT_DATA);
      }
      search(args.join(' '));
    }
}

module.exports = methods;