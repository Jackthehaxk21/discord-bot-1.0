let methods = {
  run : async function(client, args, message) {
    //client.reminders;\
    const ms = require('ms')
    const moment = require('moment');
    
    function regCheck(reminder) {
      const remind = /(?:^| )(?:in ?)?(((?:\d{1,2}(?:\.\d|\d)?)|a) ?((?:m(?:in(?:ute)?)?|h(?:our)?|d(?:ay)?|w(?:eek)?|m(?:onth)?|y(?:ear)?)s?))\b/gi.exec(reminder);
      if (!remind) return false;
      const time = remind[1]
        .replace(/ ms?\b/, " min") //m => min
        .replace(/\ba ?((?:m(?:in(?:ute)?)?|h(?:our)?|d(?:ay)?|w(?:eek)?|m(?:onth)?|y(?:ear)?)s?)\b/g, "1 $1").trim(); // a "something" => 1 "something"
      const input = /(?:me ?)?(?:to ?)?(.*)/gi.exec(reminder)[1]
        .replace(remind[0], "").trim();
      if (input.length === 0) return false;
      return `${input}#${time}`;
    }
    
    if (args.length === 0) {
      const reminders = client.reminders.filter(r => r.id == message.author.id);
      if (reminders.length === 0) return message.reply("You do not have any reminders set.");
      else return message.channel.send("**Your Reminders:**\n" + reminders.map(r => `${r.reminder} - ${moment(r.reminderTimestamp).fromNow()}`).join('\n'));
    }
    const blah = await regCheck(args.join(" "));
    if (!blah) return message.reply("Invalid Command usage, you must supply a reminder message and duration e.g; `Do the laundry in 20 minutes`.");
    client.reminders.set(`${message.author.id}-${message.createdTimestamp + ms(blah.split("#")[1])}`, {
      id: message.author.id,
      guildid: message.guild.id,
      reminder: blah.split("#")[0],
      reminderTimestamp: message.createdTimestamp + ms(blah.split("#")[1])
    });

    message.channel.send(`I will remind you to \`${blah.split("#")[0]}\`, ${blah.split("#")[1]} from now.`);

    
  }
}

module.exports = methods;