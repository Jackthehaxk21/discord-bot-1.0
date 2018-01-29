let methods = {
  run : async function(client, prefix) {
    client.user.setPresence({game: {name: " "+prefix+"help | Servers: " + client.guilds.size, type: 0}});
    console.log('[SYS] | 💻 | I am ready!');
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client, prefix);
    
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
// Oh look a shortcut to initializing ;)
client.myColl = new Enmap({ provider: new EnmapLevel({ name: 'Test1' }) });
 
(async function() {
    await client.myColl.defer;
    console.log(client.myColl.size + ' keys loaded');
 
    // Setting data is done with a key and value.
    client.myColl.set('simplevalue', 'this is a string');
    
    // enmap supports any **primitive** type.
    client.myColl.set('boolean', true);
    client.myColl.set('integer', 42);
    client.myColl.set('null', null);
 
    // enmap can retrieve items at any time
    const simplevalue = client.myColl.get('simplevalue'); // 'this is a string'
    const myboolean = client.myColl.get('boolean'); // true
    if(client.myColl.get('boolean')) console.log('yay!') // prints 'yay!' to the console.
 
    // You can **change** the value of a key by loading it, editing it,
    // then setting it **back** into enmap. There's no "update" function
    // it just overrides the data through the same set method: 
    client.myColl.set('someobject', {blah: "foo", thing: "amajig"});
    console.log(client.myColl.get('someobject').blah) // prints the object to console.
 
    const myObject = client.myColl.get('someobject'); // value is now the object with 2 properties.
    myObject.thing = "amabob"; // value of temporary object is now {blah: "foo", thing: "amabob"}
    client.myColl.set('someobject', myObject); // only now is it actually written correctly.
}());
  }
}

module.exports = methods;