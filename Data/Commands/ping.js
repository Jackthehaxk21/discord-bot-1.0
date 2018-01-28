let methods = {
  ping : async function(client, args, message) {
    const msg = await message.channel.send('Ping!');
    msg.edit(`🏓 Pong! (Roundtrip took: ${msg.createdTimestamp - message.createdTimestamp}ms. ❤️: ${Math.round(client.ping)}ms.)`);
  }
}

module.exports = methods;