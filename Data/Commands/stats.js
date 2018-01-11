var methods = {
   get: function(client, args, message) {
       let check = '';
       let uptime = process.uptime();
       let days = '0';
       uptime = Math.floor(uptime/60);  //In minutes now
       check = 'Minutes';
       if (uptime > 60) {
         uptime = Math.floor(uptime/60);  //In hours now
         check = 'Hours';
         if (uptime > 24) {
           days = Math.floor(uptime/24);
           uptime = Math.floor(uptime-(days*24));
         }
       }
       days = days + ' Days';
       uptime = uptime + ' ' +check;
       let guilds = client.guilds.size;
       let clients = client.users.size;
       let proces = process.title +'-'+ process.version;
       let mem = Math.round((process.memoryUsage().heapUsed / 1024 / 1024)*100)/100;
       let ava_mem = Math.floor((process.memoryUsage().heapTotal/1024/1024 *100) /100);
       let txt = `
===== STATS =====
Up-Time  :: ${days} and ${uptime}
Servers  :: ${guilds}
Users    :: ${clients}
Process  :: ${proces}
Mem Used :: ${mem} MB / ${ava_mem} MB
===== STATS =====
`;
       message.channel.send('```asciidoc'+txt+'```');
   }
}

module.exports = methods;