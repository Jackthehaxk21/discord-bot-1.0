var methods = {
    run: async function(client, args, message){
      //console.log(message.member.roles);
      try {
      let member = message.author;
      let game = member.presence.game;
      try{
      if(game.type == 0) game = "Playing: '"+game.name+"'";
      if(game.type == 1) game = "Streaming: '"+game.name+"'";
      if(game.type == 2) game = "Listening To: '"+game.name+"'";
      if(game.type == 3) game = "Watching: '"+game.name+"'";
      } catch(err) {}
      if(game == undefined || game == null) game = 'Not playing...';
      let nick = message.member.nickname;
      if(nick == undefined) nick = message.author.username;
      let prefab = `
Information for ${member.username}#${member.discriminator}

General
------------------------------
ID             :: ${member.id}
Nickname       :: ${nick}
Created On     :: ${member.createdAt.toString()}

Other
------------------------------
Current Status :: ${member.presence.status} - ${game}
Roles          :: ${message.member.roles.size} Roles:
${message.member.roles.map(r => r.name).join(', ')}

`;
      message.channel.send('```asciidoc'+prefab+'```');
      } catch (err) {
        message.channel.send('A error occured, let me try a simplified version...');
        try {
          const guild = message.guild;
      const online = await guild.members.filter(m => m.presence.status === 'online' || m.presence.status === 'idle' || m.presence.status === 'dnd').size;
      const offline = guild.memberCount - online;
      let prefab = `
Information for ${guild.name}

General
------------------------------
ID             :: ${guild.id}
Created On     :: ${guild.createdAt.toString()}
Server Owner   :: ${guild.owner.user.username + '#' + guild.owner.user.discriminator} (${guild.owner.user.id})
Server Region  :: ${guild.region}

Members
------------------------------
Member Count   :: ${guild.memberCount}
Member Stats   :: ${online} Online, ${offline} (${Math.floor(((message.guild.members.filter(m => m.presence.status == 'online' || m.presence.status == 'idle' || m.presence.status == 'dnd').size)/message.guild.members.size)*100)}%) Offline

Other
------------------------------
Channel Count  :: ${guild.channels.size}
Roles          :: ${guild.roles.size} roles

`;
      message.channel.send('```asciidoc'+prefab+'```');
        } catch (err) {
          message.channel.send('Oh No, my backup plan failed sorry\nTo help us fix this please use the support command !'); 
        }
      }
    }
}

module.exports = methods;