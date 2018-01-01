let methods = {
  run : async function(client, args, message) {
    let n = args[0];
    if (!n) {
      message.channel.send('**dice **| ⚠️ | Please supply a number to roll.');
      return;
    }
    if (isNaN(n)) {
      message.channel.send('**dice **| ⚠️ | `'+n+'` is not a valid number.');
      return;
    }
    if (parseInt(n) < 4 || parseInt(n) > 1000) {
      message.channel.send('**dice **| ⚠️ | I cannot roll a '+n);
      return;
    }
    const msg = await message.channel.send('**dice **| Rolling...');
    let random = await Math.floor(Math.random() * parseInt(n)+1);
    if (random == 0) random = 1;
    msg.edit('**dice **| I rolled a '+random);
  }
}

module.exports = methods;