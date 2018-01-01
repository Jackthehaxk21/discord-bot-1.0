let methods = {
  run : function(guild, client) {
    //console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    //console.log("DISCORD ^^^^");
    var MK = client.guilds.get("393114138135625749").channels.get("name", "bot-log");
    MK.send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    
  }
}

module.exports = methods;