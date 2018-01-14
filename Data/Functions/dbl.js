const methods = {
  run: function(client, prefix){
    if(prefix == 'mkb!') return;
    const dbl = require(`discord-bot-list`)
 
    const Bot = new dbl({
        token: process.env.dblToken,
        id: process.env.botID
    })
    
    Bot.postStats(client.guilds.size+10, (err, res) => {
      if(err) {
          console.error(err)
      } else {
          console.log('Updated API size to '+client.guilds.size)
      }
    })
  }
}
module.exports = methods;