/*var methods = {
	test: function(msg, message) {
    message.channel.send('etst');
		console.log('Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000));
	},
	currentDate: function() {
		console.log('Current Date is: ' + new Date().toISOString().slice(0, 10));
	}
};*/

var methods = {
    kick: function(client, args, message) {
            //console.log("kick");
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if(!message.member.hasPermission("KICK_MEMBERS")) {
                message.reply("🔐 | You don't have permissions to use this!");
                //console.log("no perm");
                return;
            }
            // Let's first check if we have a member and if we can kick them!
            // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
            var toKick = message.mentions.members.first();
            if(!toKick) {
                message.reply("⚠️ | Please mention a valid member of this server");
                //console.log("No user");
                return;
            }
            if (!toKick.kickable) {
                //console.log("Not kickable");
                message.reply("⚠️ | I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
                return;
            }
            // slice(1) removes the first part, which here should be the user mention!
            var reason = args.join(' ').replace(args[0], '');
            if (!reason) {
                //console.log("no reason");
                message.reply("⚠️ | Please indicate a reason for the kick!");
                return;
            }
            // Now, time for a swift kick in the nuts!
            try {
                //console.log("Kicking...");
                toKick.kick(reason)
            } catch (e) {
                //console.log(e);
                message.reply(`⚠️ | Sorry ${message.author} I couldn't kick because of : ${e}`);
            }
            message.channel.send('✅ | '+toKick.user.username+" has been kicked by "+message.author+" because: "+reason);
            //message.guild.channels.find("name","bot-announcments").send(`@${toKick.user.tag} has been kicked by @${message.author.tag} because: ${reason}`);
  }
}

module.exports = methods;