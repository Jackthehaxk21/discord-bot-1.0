let methods = {
  run: async function(client, args, message){
   // message.channel.send("start");
   // if(message.author.id != process.ownerID) return;
    //message.channel.send("check");
    let id = await args[0];
    //message.channel.send(id);
    var SUPPORT = await client.guilds.get(id);
    //console.log(message.author.tag.replace(/ +/g,'-').replace('#', '_').toLowerCase());
    SUPPORT.createChannel('DELETE_ME', 'text').then(c => {
      c.send('PLEASE DELETE THIS CHANNEL');
      c.createInvite().then(invite =>
          message.channel.send(invite.url)
      );
    });
  }
}

module.exports = methods;