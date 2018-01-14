let methods = {
  run : function(client, prefix) {
    client.user.setPresence({game: {name: " "+prefix+"help | Servers: " + client.guilds.size, type: 0}});
    console.log('[SYS] | 💻 | I am ready!');
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client, prefix);
  }
}

module.exports = methods;