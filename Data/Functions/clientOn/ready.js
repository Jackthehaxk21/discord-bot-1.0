let methods = {
  run : async function(client, prefix) {
    client.user.setPresence({game: {name: " "+prefix+"help | Servers: " + client.guilds.size, type: 0}});
    console.log('[SYS] | 💻 | I am ready!');
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client, prefix);
    
    // Load Enmap
const Enmap = require('enmap');
 
// Load EnmapLevel
const EnmapLevel = require('enmap-level');
 
// Initialize the leveldb with the name "test" (this is the folder name in ./data)
const level = new EnmapLevel({ name: 'test' });
 
// Initialize the Enmap with the provider instance.
const myColl = new Enmap({ provider: level });
 
// Persistent providers load in an **async** fashion and provide a handy defer property:
 
myColl.defer.then(() => {
    // all data is loaded now.
    console.log(myColl.size + "keys loaded");
});
 
// You can also await it if your function is async: 
(async function() {
    await myColl.defer;
    console.log(myColl.size + "keys loaded");
    // Do stuff here!
}());
 
// Persistent collections should be **closed** before shutdown: 
await myColl.db.close(); // or level.close() works too!
  }
}

module.exports = methods;