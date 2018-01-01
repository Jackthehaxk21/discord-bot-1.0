let methods = {
  get : function(client, args, message) {
    const quotes = require('../Quotes.json');
    var randomAnswer = quotes[Math.floor(Math.random() * quotes.length)];
    message.channel.send('```' + randomAnswer + '```');
  }
}

module.exports = methods;