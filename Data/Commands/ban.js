var methods = {
    ban: function(args, message) {
            if(!message.member.hasPermission("BAN_MEMBERS")) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
      
            var toBan = message.mentions.members.first();
            var name = toBan.username;
            if(!toBan) {
                message.reply("Please mention a valid member of this server");
                return;
            }
            if (!toBan.kickable) {
                message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
                return;
            }
            var reason = args[1];
            if (!reason) {
                message.reply("Please indicate a reason for the ban!");
                return;
            }
            try {
                toBan.ban(reason)
            } catch (e) {
                message.reply(`Sorry ${message.author} I couldn't ban because of : ${e}`);
            }
            message.channel.send(name+" has been banned by "+message.author+" because: "+reason);
  }
}

module.exports = methods;