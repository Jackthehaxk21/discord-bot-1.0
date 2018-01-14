let methods = {
  run : async function(guild, client, prefix) {
    //console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    //console.log("DISCORD ^^^^");
    /*var MK = await client.guilds.get("393114138135625749")
    MK = await MK.channels.get("name", "bot-log");
    MK.send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    */
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client, prefix);
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    
  }
}

module.exports = methods;