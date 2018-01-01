var methods = {
    ban: async function(client, args, message) {
            if(!message.member.hasPermission("BAN_MEMBERS")) {
                message.reply("**ban **| ⚠️ | You don't have permissions to use this.");
                return;
            }
      
            var toBan = message.mentions.members.first();
            if(!toBan) {
                message.reply("**ban **| ⚠️ | Please mention a valid member of this server.");
                return;
            }
            if (!toBan.bannable) {
                //console.log("Not kickable");
                message.reply("⚠️ | I cannot Ban this user! Do they have a higher role? Do I have ban permissions?");
                return;
            }
            var name = toBan.user.username;
            var reason = args.join(' ').replace(args[0], '');
            if (!reason) {
                message.reply("**ban **| ⚠️ | Please indicate a reason for the ban!");
                return;
            }
            try {
                await toBan.ban(reason);
                message.channel.send('✅ | '+name+" has been banned by "+message.author+" because: "+reason);
            } catch (e) {
                message.reply('⚠️ | Sorry '+message.author+' I couldn\'t ban because : '+e);
                return;
            }
            //message.channel.send('BAN ERROR');
  }
}

module.exports = methods;