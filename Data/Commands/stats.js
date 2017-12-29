var methods = {
   getStats: function(client, message) {
       let check = '';
       let uptime = Math.floor(process.uptime());
       let days = '0';
       uptime = Math.floor(uptime/60);  //In minutes now
       check = 'Minutes';
       if (uptime > 60) {
         uptime = uptime/60;  //In hours now
         check = 'Hours';
         if (uptime > 24) {
           days = Math.floor(uptime/24);
           uptime = uptime-(days*24);
         }
       }
       days = days + ' Days';
       uptime = uptime + ' ' +check;
       let guilds = client.guilds.size;
       let clients = client.users.size;
       let proces = process.title +'-'+ process.version;
       let txt = `
===== STATS =====
Up-Time  :: ${days} and ${uptime}
Servers  :: ${guilds}
Users    :: ${clients}
Process  :: ${proces}
=================
`;
       message.channel.send('```asciidoc'+txt+'```');
   }
}

module.exports = methods;