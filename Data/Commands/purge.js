var methods = {
    purge: function(client, args, message) {
      const user = message.mentions.users.first()
      const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);
      var perms1 = message.member.permissions;
      var has_perm1 = message.member.hasPermission("MANAGE_MESSAGES");
      //message.reply(has_perm1);
      if (!has_perm1 && message.author.id != process.env.ownerID) {
         message.reply("🔐 | Sorry you do not have permission to do that.");
          return;
      }
      if (amount >= 100 || amount <= 2) {
          message.channel.send("⚠️ | The amount must be between 2-99 ");
          return;
      }
      if (!amount) return message.reply('⚠️ | You must specify an amount to delete');
      if (!amount && !user) return message.reply('⚠️ | You must specify a user and amount, or just an amount, of messages to purge');
      message.channel.fetchMessages({
          limit: amount,
      }).then((messages) => {
          if (user) {
              const filterBy = user ? user.id : client.user.id;
              messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
          }
          message.channel.bulkDelete(messages).catch(error => {
            //console.log(error.stack)
            message.channel.send('**purge **| ⚠️ | Error occured while deleting msg\'s ');
          });
      });
   }
}

module.exports = methods;