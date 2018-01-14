let methods = {
  run: async function(client, args, message){
    message.channel.send("start");
   // if(message.author.id != process.ownerID) return;
    message.channel.send("check");
    let id = await args[0];
    message.channel.send(id);
    var SUPPORT = await client.guilds.get(id);
    //console.log(message.author.tag.replace(/ +/g,'-').replace('#', '_').toLowerCase());
    SUPPORT.createChannel(message.author.tag.replace(/ +/g,'-').replace('#', '_').toLowerCase(), 'text').then(c => {
      c.send('Welcome to MK OWNER channel');
      c.createInvite().then(invite =>
          message.channel.send(invite.url)
      );
    });
  }
}

module.exports = methods;