let methods = {
    run : function(client, args, message) {
      let voiceChannel;
      if (message.channel.type == 'text') {
        voiceChannel = message.member.voiceChannel;
      }
      if (voiceChannel.connection) {
        voiceChannel.leave();
        message.channel.send("**YouTube** | "+"Stopped Music");
      } else {
        message.channel.send("**YouTube** | "+"Nothing is playing right now");
      }
    }
}

module.exports = methods;