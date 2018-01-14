var methods = {
  get: async function(message, sql) { 
    const run = async function(message, points, level) { // eslint-disable-line no-unused-vars
      const getProfile = async function(user, person, points, level) {
        const { Canvas } = require('canvas-constructor');
        const snek = require('snekfetch');
        const { resolve, join } = require('path');
        const fsn = require('fs-nextra');
        const plate = await fsn.readFile('../../Data/profile.png');
        const png = person.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=64');
        const { body } = await snek.get(png);
        const size = new Canvas(270, 90)
          .measureText(user);
        const newSize = size.width < 180 ? 270 : 90 + size.width + 10;
        return new Canvas(newSize, 90)
          .setColor('#FFFFFF')
          .addRect(0, 0, newSize, 90)
          .setColor('#383838')
          .addRect(18, 17, 75, 73)
          .setColor('#000000')
          .addImage(body, 20, 19, 73, 71)
          .restore()
          .addImage(plate, 0, 0, 270, 90)
          .addText(user, 140, 19)
          .addText(level, 162, 43)
          .addText(points, 162, 58)
          .toBuffer();
      }
      let target = message.author;
      const result = await getProfile(target.tag, target.displayAvatarURL, points, level);
      await message.channel.send({ files: [{ attachment: result, name: 'profile.png' }] });
      //message.channel.send("Sorry but the social commands are down for repair\nVery sorry for any inconvienve caused.");
      //return;
      sql.get(`SELECT * FROM scores WHERE userId = "${message.guild.id+message.author.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id + message.author.id, 1, 0]);
          run(message, 1, 0);
        } else {
          run(message, row.points, row.level); 
        }
      }).catch((e) => {
        console.log(e);
        //console.log('new t');
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id + message.author.id, 1, 0]);
          run(message, 1, 0);
        });
      });
    }
  }
}

module.exports = methods;