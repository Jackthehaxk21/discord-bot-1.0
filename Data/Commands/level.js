const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const snek = require('snekfetch');
Canvas.registerFont('./FiraCode-Bold.ttf', 'font');
var methods = {
  get: async function(message, sql) {
      const FullName = message.author.tag;
      const user = message.author.avatarURL;
      const Pic = async function(message, level, points) {
          const picture = await user.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=64');
          const {AvatarPerson} = await snek.get(picture);
          var result =  new Canvas(325, 90)
            .setColor('#FFFFFF')
            .addRect(0, 0, 325, 90)  //white back//
          
            .setColor('#660066')
            .addRect(10, 21, 59, 65) //purple shadow//
          
            .addImage(AvatarPerson, 14, 17, 62, 62)
          
            .setColor('#'+Math.floor(Math.random() * 999999))
            .setTextFont('14pt font')
            .addText(FullName, 90, 29)
          
            .setColor('#'+Math.floor(Math.random() * 999999))
            .addText('Level  | '+level, 90, 51)
            .addText('Points | '+points, 90, 71)
            .toBuffer();
          try {
            message.channel.send({files: [{attachment: result, name: 'user.png'}]}); 
          } catch(err){
            message.reply('Sorry we couldn\'t get your profile right now.');
          }
      }
      sql.get(`SELECT * FROM scores WHERE userId = "${message.guild.id+message.author.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id + message.author.id, 1, 0]);
          Pic(message, 0, 1);
        } else {
          Pic(message, row.level, row.points);
        }
      }).catch(() => {
        console.error;
        //console.log('new t');
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
          sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.guild.id + message.author.id, 1, 0]);
          Pic(message, 0, 1);
        });
      });
  }
}

module.exports = methods;