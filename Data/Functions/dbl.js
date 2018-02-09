const methods = {
  run: function(client){
    //if(prefix == 'mkb!') return;
    const dbl = require(`discord-bot-list`)
 
    const Bot = new dbl({
        token: process.env.dblToken,
        id: process.env.botID
    })
    
    Bot.postStats(client.guilds.size, (err, res) => {
      if(err) {
          console.log("API Server Error");
      } else {
          console.log('Updated API Server size to '+client.guilds.size)
      }
    })
  }
}
module.exports = methods;
