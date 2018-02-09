let methods = {
  run: async function(client, args, message){
/*message.channel.send('Write your Name')
      .then(function(){
        message.channel.awaitMessages(response => message.content, {
          max: 1,
          time: 30000,
          errors: ['time'],
        })
        .then((collected) => {
            message.channel.send(`Your Name is: ${collected.first().content}`);
          })
          .catch(function(){
            message.channel.send('You didnt write your name');
          });
      });*/
    
    
    const Command = require(`${process.cwd()}/base/Command.js`);
const ms = require("ms");
const moment = require("moment");

class Reminder extends Command {
  constructor(client) {
    super(client, {
      name: "reminder",
      description: "Remind yourself with this command.",
      category: "Utilities",
      usage: "reminder [me] <reminder message>",
      extended: "Need to be reminded to take the trash out? This command can help!",
      aliases: ["remember", "remind", "reminders"]
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
      }
}

module.exports = Reminder;
  }
}

module.exports = methods;