let methods = {
  run: async function(client, args, message){
    if(args.size < 1) {
      message.channel.send("Please use "+ await client.settings.get(message.guild.id).prefix+"settings view|edit");
    }
    const type = args[0];
    if(args.length >= 1 && args.length <= 3) {
      if(type == "view") {
        const data = await client.settings.get(message.guild.id)
        let chan = `
${message.guild.name}'s Settings !

prefix                 :: ${data.prefix}
welcomeMessageOn       :: ${data.welcomeMessageOn}
welcomeMessageChannel  :: ${data.welcomeMessageChannel}
leaveMessageOn         :: ${data.leaveMessageOn}
leaveMessageChannel    :: ${data.leaveMessageChannel}
levelUpMessageOn       :: ${data.levelUpMessageOn}
systemNoticeChannel    :: ${data.systemNoticeChannel}

for e.g to change prefix type:
${data.prefix}settings edit prefix NEW-PREFIX-HERE
                             `;
        message.channel.send("```asciidoc"+chan+"```");
        return;
      } else {
        if(type == "edit") {
          if(message.author.id != message.guild.ownerID && message.author.id != process.env.ownerID) {
            await message.channel.send("You must be the owner of the server to change any settings !");
            return;
          }
          if(args[1] != undefined && args[2] != undefined) {
            const data = client.settings.get(message.guild.id);
            let key;
            if(args[1] in data) {
              if(args[1] == 'prefix') key = args[2].toLowerCase();
              else key = args[2];
              
              if(args[1] == 'welcomeMessageOn' || args[1] == 'leaveMessageOn' || args[1] == 'levelUpMessageOn') {
                if(args[2] != 'true' && args[2] != 'false') return message.channel.send('The value for `'+args[1]+'` must be either true or false');
              }
              data[args[1]] = key;
              //console.log("2");
              client.settings.set(message.guild.id, data);
              //console.log("3")
              message.channel.send("Changed `"+args[1]+"` to `"+key+"`");
            } else {
              message.channel.send("`"+args[1]+"` Is not a valid KEY");
              return;
            }
            
          } else {
            message.channel.send("Incorrect usage, type "+ await client.settings.get(message.guild.id).prefix+"usage settings");
          }
        } else {
          message.channel.send("Incorrect usage, type "+ await client.settings.get(message.guild.id).prefix+"usage settings");
        }
      }
    } else {
      message.channel.send("Incorrect usage, type "+ await client.settings.get(message.guild.id).prefix+"usage settings");
    }
  }
}

module.exports = methods;