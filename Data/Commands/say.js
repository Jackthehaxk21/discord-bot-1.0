let methods = {
  run : async function(client, args, message) {
    if (message.author.id != process.env.ownerID) {
      message.reply('This is a owner only command');
      return;
    }
    await message.delete();
    message.channel.send(args.join(' '));
    return;
  }
}

module.exports = methods;