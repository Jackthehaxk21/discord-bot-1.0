const methods = {
  
  getMoney : async function(client, args, message) {
    let money;
    let newTime = Date.now();
    const sql = require('sqlite');
    await sql.open('../../Data/Data.sqlite');
    await sql.get(`SELECT * FROM money WHERE ID = "${message.guild.id+message.author.id}"`).then(row => {
      if (!row) {
        sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
        money = 0;
        
      } else {
        money = row.money;
      }
    }).catch(() => {
        return sql.run("CREATE TABLE IF NOT EXISTS money (ID TEXT, money INTEGER, daily INTEGER)").then(() => {
          sql.run("INSERT INTO money (ID, money, daily) VALUES (?, ?, ?)", [message.guild.id+message.author.id, 0, newTime]);
          money = 0;
        });
    });
    return money;
    
  }
    
}

module.exports = methods;