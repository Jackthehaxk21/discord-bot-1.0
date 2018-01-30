let methods = {
  run : async function(client, prefix) {
    client.user.setPresence({game: {name: " "+prefix+"help | Servers: " + client.guilds.size, type: 0}});
    console.log('[SYS] | 💻 | I am ready!');
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client, prefix);
    
    client.announcment = "Major update, new commands involvd per-guild settings !";
    client.announcments = await client.guilds.map(g => g.id)
    
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
// Oh look a shortcut to initializing ;)
client.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) });
 
(async function() {
    await client.settings.defer;
    console.log(client.settings.size + ' keys loaded');
 
    // Setting data is done with a key and value.
    //client.myColl.set('simplevalue', 'this is a string');
    
    // enmap supports any **primitive** type.
    //client.myColl.set('boolean', true);
    //client.myColl.set('integer', 42);
    //client.myColl.set('null', null);
 
    // enmap can retrieve items at any time
    //const simplevalue = client.myColl.get('simplevalue'); // 'this is a string'
    //const myboolean = client.myColl.get('boolean'); // true
    //if(client.myColl.get('boolean')) console.log('yay!') // prints 'yay!' to the console.
 
    // You can **change** the value of a key by loading it, editing it,
    // then setting it **back** into enmap. There's no "update" function
    // it just overrides the data through the same set method: 
    //client.myColl.set('someobject', {blah: "foo", thing: "amajig"});
    //console.log(client.myColl.get('someobject').blah) // prints the object to console.
 
    //const myObject = client.myColl.get('someobject'); // value is now the object with 2 properties.
    //myObject.thing = "amabob"; // value of temporary object is now {blah: "foo", thing: "amabob"}
    //client.settings.set('TEST', 'TEST-REPLT'); // only now is it actually written correctly.
}());
    
// Oh look a shortcut to initializing;)
client.points = new Enmap({ provider: new EnmapLevel({ name: 'points' }) });
 
(async function() {
    await client.points.defer;
    console.log(client.points.size + ' keys loaded');
}());
    
  }
}

module.exports = methods;