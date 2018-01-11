let methods = {
  get : function(client, args, message, prefix) {
    let command = args[0];
    const data = require('../usage.json');
    if (command == undefined || command == null) {
      message.channel.send('**Usage **| ⚠️ | Invalid usage e.g. !usage kick');
      return;
    } else {
      command = command.toLowerCase();
      try {
        var txt = `
Title   :: ${data[command].title}
Usage   :: ${prefix}${data[command].usage} 
Notes   :: ${data[command].notes}
`;
        message.channel.send(txt, {code:'asciidoc'});
        return;
      } catch (e) {
        message.channel.send('**usage** | ⚠️ | Command `'+command+'` Not found.');
        return;
      }
    }
  }
}

module.exports = methods;