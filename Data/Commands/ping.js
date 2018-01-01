let methods = {
  ping : async function(client, args, message) {
    const msg = await message.channel.send('Ping!');
    let d = (msg.createdTimestamp - message.createdTimestamp)
    msg.edit(`🏓 Pong! (Roundtrip took: ${d}ms. ❤️: ${Math.round(client.ping)}ms.)`);
  }
}

module.exports = methods;