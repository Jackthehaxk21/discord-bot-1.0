let methods = {
  run: async function(client, args, message){
    //message.channel.send("start");
    if(message.author.id != process.env.ownerID) {
      message.channel.send('Want me in your server simply click this link:\n**<https://goo.gl/CoVrrK>**\nOr:\n**<https://goo.gl/5ynvAu>**');
      return;
    }
    message.channel.send('Want me in your server simply click this link:\n**<https://goo.gl/CoVrrK>**\nOr:\n**<https://goo.gl/5ynvAu>**');
    //message.channel.send("check");
    if(args.length == 0 || args.size == 0) return;
    let id = args[0];
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