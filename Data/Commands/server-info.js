var methods = {
    run: async function(client, args, message) {
      try {
      let roles;
      const guild = message.guild;
      if(guild.roles.size < 101) {
        roles = guild.roles.map(r => r.name).join(", ")
      } else {
        roles = guild.roles.map(r => r.name).slice(0,101).join(", ")
        roles += ' ----AND MORE...----'
        //roles = 'Too many to show';
      }
      const bans = await guild.fetchBans()
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
Member Stats   :: ${online} Online, ${offline} Offline
Members Banned :: ${bans.size} banned:
${bans.map(b => b.username).join(', ')}

Other
------------------------------
Channel Count  :: ${guild.channels.size}
Roles          :: ${guild.roles.size} roles:
${roles}

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
Member Stats   :: ${online} Online, ${offline} Offline

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