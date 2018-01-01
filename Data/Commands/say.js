let methods = {
  run : async function(client, args, message) {
    await message.delete();
    message.channel.send(args.join(' '));
    return;
  }
}

module.exports = methods;