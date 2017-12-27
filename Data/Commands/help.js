var methods = {
    help: function(Discord, prof_pic, args, message) {
        console.log("help");
        switch (args[0]) {
            case "2":
                //two
                message.reply("two");
                break;
            default:
                //one
                if (args[0] > 2) {
                    message.reply("There are only 2 pages of docs");
                    break;
                }
                var test = "";
                    
                const embed = new Discord.RichEmbed()
                    .setTitle("MK-Bot | Help Page 1/2")
                    .setAuthor("MK-Bot 1.1.2", prof_pic)
                /*
                * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                */
                    .setColor(0x00AE86)
                    .setDescription("Help documentation for 'MK-Bot'\ntype !help <PAGE NUMBER> to access other pages.\n ")
                    .setFooter(`Docs for ${message.author.username}`, message.author.avatarURL)
                    //.setImage(message.author.avatarURL)
                    .setThumbnail(prof_pic)
                /*
                * Takes a Date object, defaults to current date.
                */
                    .setTimestamp()
                        //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                    .addField("**===================================**","***Commands with § mean they're limited to certain users***\n\n")
                    .addField("**!ping**",
                        "*Usage = !ping*\nUsed to ping me to check if im operational !")
                    .addField("**!level**",
                        "*Usage = !level*\nUsed to display you\'re XP and Level")
                    .addField("**!help**", 
                        "*Usage = !help <PAGE NUMBER>*\nDisplay help documentation for MK")
                    .addField("**!test §**", 
                        "*Usage = !test <arg0> <arg1> <arg2>*\nDEBUG ONLY !");

                message.channel.send({embed});
            
                break;
          } 
    }
}

module.exports = methods;