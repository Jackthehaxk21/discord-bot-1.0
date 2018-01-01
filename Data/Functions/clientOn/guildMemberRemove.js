let methods = {
  run : function(member) {
    if (member.guild.id == "395657844982022145") {
      let chan = (member.user.username+'#'+member.user.discriminator).replace(/ +/g,'-').replace('#', '_').toLowerCase();
      chan = member.guild.channels.find('name',chan);
      chan.send('------- CASE CLOSED --------');
    } else {
      const guild = member.guild;
      /*let defaultChannel = guild.channels.find("name", "bot-log");
      if (!defaultChannel) defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
      defaultChannel.send("Oh No, It looks like " + member.user + " left us !");*/
    }
  }
}

module.exports = methods;