const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra');
const snek = require('snekfetch');
Canvas.registerFont('./FiraCode-Bold.ttf', 'FiraCode');

var methods = {
  getProfile: async function(user, person, points, level) {
      const plate = await fsn.readFile('./image_profile.png');
      const png = person.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=64');
      const { body } = await snek.get(png);
      const size = new Canvas(270, 90)
        .setTextFont('12pt FiraCode')
        .measureText(user);
      const newSize = size.width < 180 ? 270 : 90 + size.width + 10;
      return new Canvas(newSize, 90)
        .setColor('#FFFFFF')
        .addRect(0, 0, newSize, 90)
        .setColor('#383838')
        .addRect(12, 15, 64, 64)
        .setColor('#000000')
        .setTextFont('12pt FiraCode')
        .addImage(body, 14, 17, 62, 62)
        .restore()
        .addImage(plate, 0, 0, 270, 90)
        .addText(user, 90, 29)
        .addText(level, 172, 51)
        .addText(points, 172, 72)
        .toBuffer();
  }
}

module.exports = methods;