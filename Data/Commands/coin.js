var methods = {
    flip : function(client, args, message) {
            var coin = ['Heads','Tails'];
            if (args[0] != undefined) {
              message.channel.send("**Coin** | ⚠️ | No arguments are needed.\n ");
            }
            var random = Math.floor(Math.random()*2);
            message.channel.send("**Coin** | "+coin[random]);
    }
}

module.exports = methods;