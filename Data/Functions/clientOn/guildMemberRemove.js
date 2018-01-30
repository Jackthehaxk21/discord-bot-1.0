let methods = {
  run : async function(client, member) {
    if (member.guild.id == "395657844982022145") {
      let chan = (member.user.username+'#'+member.user.discriminator).replace(/ +/g,'-').replace('#', '_').toLowerCase();
      chan = member.guild.channels.find('name',chan);
      chan.send('------- CASE CLOSED --------');
    } else {
      const guild = member.guild;
      let defaultChannel = await guild.channels.find("name", client.settings.get(member.guild.id).leaveMessageChannel);
      //if (!defaultChannel) defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
      if (client.settings.get(member.guild.id).leaveMessageOn != "true" && client.settings.get(member.guild.id).leaveMessageOn != "true") return;
      try {
        defaultChannel.send("Oh no some-one left !\n" + member.user);
      } catch (err) {
        console.log("error");
      }
    }
  }
}

module.exports = methods;