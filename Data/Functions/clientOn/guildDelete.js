let methods = {
  run : async function(guild, client, prefix) {
    if(client.ready == false) return;
    //console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    //console.log("DISCORD ^^^^");
    var MK = await client.guilds.get("393114138135625749")
    const MK2 = await MK.channels.find("name", "bot-log");
    MK2.send({embed: {
    color: 0xff0000,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Left guild - **"+guild.name+"**",
    description: "",
    fields: [{
        name: "**Guild ID**",
        value: guild.id
      },
      {
        name: "**Member Count**",
        value: guild.memberCount
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Jackthehack21#8860"
    }
  }
});
    //MK2.send(`Left a guild: ${guild.name} (id: ${guild.id}). This guild had ${guild.memberCount} members!`);
    
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client, prefix);
    console.log(`Left a guild: ${guild.name} (id: ${guild.id}). This guild had ${guild.memberCount} members!`);
    
  }
}

module.exports = methods;