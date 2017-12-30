const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const snek = require('snekfetch');
Canvas.registerFont('./FiraCode-Bold.ttf', 'FiraCode');
var methods = {
  getProfile: async function(message, user, person, sql) {
      const getPic = async function(person, user, message, level, points) {
          const plate = await fsn.readFile('./Data/image_profile.png');
          const png = await person.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=64');
          const { body } = await snek.get(png);
          const size = new Canvas(270, 90)
            .setTextFont('12pt FiraCode')
            .measureText(user);
          const newSize = size.width < 180 ? 270 : 90 + size.width + 10;
          var result =  new Canvas(newSize, 90)
            .setColor('#FFFFFF')
            .addRect(0, 0, newSize, 90)
            .setColor('#383838')
            .addRect(12, 15, 64, 64)
            .setColor('#'+Math.floor(Math.random() * 999999))
            .setTextFont('12pt FiraCode')
            .addImage(body, 14, 17, 62, 62)
            .restore()
            .addImage(plate, 0, 0, 270, 90)
            .addText(user, 90, 29)
            .setColor('#'+Math.floor(Math.random() * 999999))
            .addText(level, 172, 51)
            .addText(points, 172, 72)
            .toBuffer();
          message.channel.send({files: [{attachment: result, name: 'profile.png'}]}); 
      }
      sql.get(`SELECT * FROM scores WHERE userId = "${message.guild.id+message.author.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id + message.author.id, 1, 0]);
          getPic(person, user, message, 0, 1);
        } else {
          getPic(person, user, message, row.level, row.points);
        }
      }).catch(() => {
        console.error;
        //console.log('new t');
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id + message.author.id, 1, 0]);
          getPic(person, user, message, 0, 1);
        });
      });
  }
}

module.exports = methods;