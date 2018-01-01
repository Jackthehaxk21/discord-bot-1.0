let methods = {
  run : function(member) {
    if (member.guild.id == "395657844982022145") {
      console.log(member.user.username+'#'+member.user.discriminator);
      member.addRole(member.guild.roles.find("name", "Member"));
      let chan = (member.user.username+'#'+member.user.discriminator).replace(/ +/g,'-').replace('#', '_').toLowerCase();
      chan = member.guild.channels.find('name', chan);
      console.log(chan.overwritePermissions(member, {'SEND_MESSAGES': true, 'READ_MESSAGE_HISTORY': true, 'ATTACH_FILES': true, 'READ_MESSAGES': true}, 'JOIN-PERMS'));
    } else {
      const guild = member.guild;
      /*let defaultChannel = guild.channels.find("name", "bot-log");
      if (!defaultChannel) defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
      defaultChannel.send("Welcome our new user!\n" + member.user);*/
    }
  }
}

module.exports = methods;