var methods = {
  get: async function(message, sql) { 
      sql.get(`SELECT * FROM scores WHERE userId = "${message.guild.id+message.author.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id + message.author.id, 1, 0]);
          message.channel.send("**"+message.author.username+":**\n**Level: **0\n**XP: **1");
        } else {
          message.channel.send("**"+message.author.username+":**\n**Level: **"+row.level+"\n**XP: **"+row.points);
        }
      }).catch(() => {
        console.error;
        //console.log('new t');
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id + message.author.id, 1, 0]);
          message.channel.send("**"+message.author.username+":**\n**Level: **0\n**XP:** 1");
        });
      });
  }
}

module.exports = methods;