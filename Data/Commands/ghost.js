let methods = {
  run: async function(client, args, message){
    try {
    let data = client.points.get(message.author.id);
    if(data.money < 5) return message.channel.send("Insufficient Funds, You have $"+data.money.toString()+" You need $5 to play")
    data.money -= 5
    client.points.set(message.author.id, data);
    } catch (err) {
      return message.channel.send("Insufficient Funds, You have $0 You need $5 to play.\n*P.S. have you got your daily ?*")
    }
    message.channel.send("**Ghost Game**\nThere are 3 doors, 1 has a ghost waiting behind it\nChoose correctly you win $10, Choose incorrectly you get nothing.")
    let number = Math.round(Math.random()*3)
    message.channel.send(message.author.username+", Pick a door 1,2 or 3 (you have 30 seconds)")
    
    await message.channel.awaitMessages(response => response.author.id == message.author.id, {
          max: 1,
          time: 30000,
          errors: ['time'],
        })
        .then((collected) => {
            let msg = collected.first().content
            if(msg != '1' && msg != '2' && msg != '3') return message.channel.send("Invalid Option, game ended.")
            if(collected.first().content == number.toString()){
              message.channel.send("**Boo**\nA ghost was behind that door, unlucky")
              return;
            } else {
              message.channel.send("**Well Done !**\nYou won $10, and lived to tell the story.")
              let data = client.points.get(message.author.id);
              data.money += 10;
              client.points.set(message.author.id, data);
              return;
            }
        })
        .catch(function(){
            message.channel.send('You didnt choose a door quick enough, you lost $5');
        });
  }
}
module.exports = methods;