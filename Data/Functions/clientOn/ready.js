let methods = {
  run : async function(client, prefix) {
    client.user.setPresence({game: {name: " "+prefix+"help | Servers: " + client.guilds.size, type: 0}});
    console.log('[SYS] | 💻 | I am ready!');
    const dbl = require('../../../Data/Functions/dbl.js');
    dbl.run(client, prefix);
    
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
// Oh look a shortcut to initializing ;)
const myColl = new Enmap({ provider: new EnmapLevel({ name: 'Test1' }) });
 
(async function() {
    await myColl.defer;
    console.log(myColl.size + 'keys loaded');
 
    // Setting data is done with a key and value.
    myColl.set('simplevalue', 'this is a string');
    
    // enmap supports any **primitive** type.
    myColl.set('boolean', true);
    myColl.set('integer', 42);
    myColl.set('null', null);
 
    // enmap can retrieve items at any time
    const simplevalue = myColl.get('simplevalue'); // 'this is a string'
    const myboolean = myColl.get('boolean'); // true
    if(myColl.get('boolean')) console.log('yay!') // prints 'yay!' to the console.
 
    // You can **change** the value of a key by loading it, editing it,
    // then setting it **back** into enmap. There's no "update" function
    // it just overrides the data through the same set method: 
    myColl.set('someobject', {blah: "foo", thing: "amajig"});
    console.log(myColl.get('someobject')) // prints the object to console.
 
    const myObject = myColl.get('someobject'); // value is now the object with 2 properties.
    myObject.thing = "amabob"; // value of temporary object is now {blah: "foo", thing: "amabob"}
    myColl.set('someobject', myObject); // only now is it actually written correctly.
}());
  }
}

module.exports = methods;