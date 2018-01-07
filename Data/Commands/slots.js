let methods = {
  run: async function(client, args, message) {
    const { SlotMachine, SlotSymbol } = require('slot-machine');
    //🍎🍒🍇💰🎁❔
    const box = new SlotSymbol('box', {
        display: '🎁',
        points: Math.floor(Math.random()*200),
        weight: 40
    });
    
    const grape = new SlotSymbol('grape', {
        display: '🍇',
        points: 10,
        weight: 100
    });
    
    const apple = new SlotSymbol('apple', {
        display: '🍎',
        points: 10,
        weight: 100
    });
    
    const cherry = new SlotSymbol('cherry', {
        display: '🍒',
        points: 20,
        weight: 80
    });
 
    const money = new SlotSymbol('money', {
        display: '💰',
        points: 200,
        weight: 20
    });
 
    const wild = new SlotSymbol('wild', {
        display: '❔',
        points: 20,
        weight: 50,
        wildcard: true
    });
 
    const machine = new SlotMachine(3, [box, grape, apple, cherry, money, wild]);
    const results = machine.play();
 
    message.channel.send(results.visualize());
    if(results.winCount == 0) {
      message.channel.send("**Slots **| Sorry you didn't win anything !");
    } else {
      message.channel.send("**Slots **| Well done you won $"+results.totalPoints+" !");
    }
  }
}

module.exports = methods;