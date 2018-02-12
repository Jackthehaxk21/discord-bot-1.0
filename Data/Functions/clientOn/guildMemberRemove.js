let methods = {
  run : async function(client, member) {
    if(client.ready == false) return;
    if (member.guild.id == "395657844982022145") {
      let chan = (member.user.username+'#'+member.user.discriminator).replace(/ +/g,'-').replace('#', '_').toLowerCase();
      chan = member.guild.channels.find('name',chan);
      chan.send('------- **CASE CLOSED** --------');
    } else {
      const guild = member.guild;
      let defaultChannel = await guild.channels.find("name", client.settings.get(guild.id).leaveMessageChannel);
      //if (!defaultChannel) defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
      if (client.settings.get(guild.id).leaveMessageOn != "true" && client.settings.get(guild.id).leaveMessageOn != "true") return;
      try {
        defaultChannel.send("Oh no **" + member.user.username+ "** decided to leave... \nProbably the bad smell going round.");
      } catch (err) {
        console.log("error");
      }
    }
  }
}

module.exports = methods;