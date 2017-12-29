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
                var help = `
== Help Documents ==

Note : Use !usage <command> to get usage information.

== Fun ==
!coin      ::   Flip a coin.
!8ball     ::   Ask 8ball a question.
!rip       ::   R.I.P someone. <Not functional yet>


== Social ==
!level     ::   Display your XP and Lvl.
!money     ::   Display your $ balance.
!donate    ::   Give money to another user.
!quote     ::   Get one of 267 quotes.
!joke      ::   Get one of 500 jokes.
!follow    ::   Get the role 'Follower'.

== YouTube ==
!yt-search ::   Search youtube for a clip.
!yt-play   ::   Play a youtube clip (supply URL).
!yt-stop   ::   Stop playing the clip.

== Moderation ==
!kick      ::   Kick user with valid reason (most of the time).
!ban       ::   Ban a user
!purge     ::   Purge messages.
!setrole   ::   Set a role to a user.
!remrole   ::   Remove a role from a user.

== Stats & Help ==
!help      ::   Shows this again.
!stats     ::   Stats for me.
!support   ::   Get support from the people that made me.

== Bot-Owner ==
!reboot    ::   PRIVATE
!eval      ::   PRIVATE

`;
                message.channel.send(help, {code:'asciidoc'});
                    
                /*const embed = new Discord.RichEmbed()
                    .setTitle("MK-Bot | Help Page 1/2")
                    .setAuthor("MK-Bot 1.1.2", prof_pic)
                
                Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                
                    .setColor(0x00AE86)
                    .setDescription("Help documentation for 'MK-Bot'\ntype !help <PAGE NUMBER> to access other pages.\n ")
                    .setFooter(`Docs for ${message.author.username}`, message.author.avatarURL)
                    //.setImage(message.author.avatarURL)
                    .setThumbnail(prof_pic)
                
                Takes a Date object, defaults to current date.
                
                    .setTimestamp()
                        //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                    .addField("**===================================**","***Commands with [HIGH]/[MED] mean they're limited to certain users***\n\n")
                    .addField("**!ping**",
                        "**Usage = !ping**\n**Args = <>**\nPerms = [LOW]\nUsed to ping me to check if im operational !")
                    .addField("**!level**",
                        "**Usage = !level**\n**Args = <>**\nPerms = [LOW]\nUsed to display you\'re XP and Level")
                    .addField("**!help**", 
                        "**Usage = !help**\n**Args = <PageNumber>**\nPerms = [LOW]\nDisplay help documentation for MK")
                    .addField("**!test §**", 
                        "**Usage = !test**\n**Args = <arg0> <arg1> <arg2>**\nPerms = [HIGH]\n***DEBUG ONLY !***");

                message.channel.send({embed});*/
            
                break;
          } 
    }
}

module.exports = methods;