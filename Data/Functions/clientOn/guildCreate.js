let methods = {
  run : async function(guild, client, prefix) {
    if(client.ready == false) return;
    //console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    //console.log("DISCORD ^^^^");
    var MK = await client.guilds.get("393114138135625749")
    const MK2 = await MK.channels.find("name", "bot-log");
    //console.log(MK);
    //console.log(MK2);
    MK2.send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client, prefix);
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    
  }
}

module.exports = methods;