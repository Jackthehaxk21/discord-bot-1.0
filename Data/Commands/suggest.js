let methods = {
  run: async function(client, args, message, prefix){
    //if (message.author.id != process.env.ownerID) {
    if (args < 2){
      message.channel.send(`Incorrect usage, use ${prefix}usage suggest to see the correct usage`);
      return;
    }
    const command = args[0];
    const desc = args.join(' ').slice(args[0].length);
    var MK = client.guilds.get("393114138135625749")
        //console.log(MK);
    var MK = MK.channels.find("name", "suggestions");
    let msg = await MK.send('**'+message.author.tag+'** Has suggested: **'+command+'**');
    msg.edit('[**'+(msg.createdAt).toString().replace(' GMT+0000 (UTC)','')+'**] [**'+message.guild.name+'**] [**'+message.author.tag+'**] HAS SUGGESTED Command: **'+command+'**  DESC: **'+desc+'**');
    //onsole.log('['+message.author.tag+'] | Command: '+command);
    message.channel.send("Thank you for your suggestion !");
    return;
  }
}

module.exports = methods;