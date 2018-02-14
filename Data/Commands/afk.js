let methods = {
  run: async function(client, args, message) {
    if(!args) return message.channel.send("Please check args, @Jackthehack usage afk")
    if(args[0] != 'on' && args[0] != 'off' && args[0] != 'edit') return message.channel.send("Please check args, @Jackthehack usage afk")
    if(args[0] == 'edit' && (args[1] == '' || args[1] == undefined || args[1] == null)) return message.channel.send("Please check args, @Jackthehack usage afk")
    if(args[0] == 'edit' && !(message.author.id in client.afk)) return message.channel.send("You cannot edit your message when your afk is **off**")
    if(args[0] == 'off' && !(message.author.id in client.afk)) return message.channel.send("Your afk status is already **off**")
    if(args[0] == 'on' && (message.author.id in client.afk)) return message.channel.send("Your afk status is already **on**")
    switch(args[0]) {
      case "on":
        client.afk[message.author.id] = message.author.username+', Is AFK';
        return message.channel.send("Success, your AFK status is now **on**")
        break;
      case "off":
        delete client.afk[message.author.id];
        return message.channel.send("Success, your AFK status is now **off**")
        break;
      case "edit":
        client.afk[message.author.id] = args.join(" ").replace("edit ", "")
        return message.channel.send("Your message is now: "+args.join(" ").replace("edit ",""))
        break;
    }
        
  }
}
module.exports = methods;