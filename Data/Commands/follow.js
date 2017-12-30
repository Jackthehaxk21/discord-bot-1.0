var methods = {
    follow : function(message) {
        var role = message.guild.roles.find("name","Follower");
        if (!role) {
          message.channel.send('**follow** | Server does not support this command');
          return;
        }
        if (message.member.roles.has(role.id)) {
          message.channel.send("**follow** | You're already a official Follower !");
          return;
        } else {
          message.member.addRole(role);
          message.reply("You are now a official Follower !");
          return;
        }
    }
}

module.exports = methods;