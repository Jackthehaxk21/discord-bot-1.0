let methods = {
  get : function(client, args, message) {
    const quotes = require('../Quotes.json');
    if (args.length == 0) {
        var ID = Math.floor(Math.random()*266);
        var randomAnswer = quotes[ID];
    } else {
      if (parseInt(args[0]) < 267 && parseInt(args[0]) >= 0) {
        var ID = parseInt(args[0]);
        var randomAnswer = quotes[parseInt(args[0])];
      } else {
          message.reply("No such quote exists under ID: `"+args[0]+"`");
          return;
      }
    }
    message.channel.send('```ID: ' + ID + '\n\n' + randomAnswer + '```');
  }
}

module.exports = methods;