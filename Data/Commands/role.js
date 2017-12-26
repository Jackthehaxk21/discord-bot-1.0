var methods = {
  
     set: function(args, message) {
            var check = 0;
            //let role = message.guild.roles.find("name", args[1]);
            /*let role = args[1];
            console.log(role.toString());
            console.log(message.guild.roles.find("name",role));
            console.log(role);
            console.log(role.id);
            console.log(message.guild.roles.get(role.toString()));
            break;*/
            //let role = message.guild.roles.find("name",role2.toString());
            //console.log(role);
            //message.channel.send(role);
            var member = message.mentions.members.first();
            var role = message.mentions.roles.first();
            var perms = message.member.permissions;
            var has_perm = message.member.hasPermission("MANAGE_ROLES");
            /*try {
                if(message.member.roles.has(role.id)) {
                    message.channel.send("User already has that role,\nSetRole - Failed.");
                    break;
                }
            } catch (e) {
                //console.log(e);
            }*/
            // Check if a member has a specific permission on the guild!
            
            //message.channel.send(member);
            if (has_perm){
                try {
                    member.addRole(role);
                } catch (e) {
                    message.channel.send("INVALID ROLE");
                    console.log(e);
                    check = 1;
                }
                try {
                    if(member.roles.has(role.id)) {
                        message.channel.send("SetRole Failed\n"+member.toString()+" already has the role "+role.toString());
                    } else {
                        if (check == 0) {
                            message.channel.send("SetRole Success !\n"+member.toString()+" was added to "+role.toString());
                            console.log("SetRole");
                        } else {
                            message.channel.send("SetRole Failed\nMake sure you spelt everything correct");
                        }
                    }
                } catch (e) {
                    console.log(e);
                    message.channel.send("SetRole Failed\nMake sure you spelt everything correct");
                }
            } else {
                message.channel.send("SetRole Failed - You do not have the perm (MANAGE_ROLES)");
            }
            //message.channel.send(member+" was added to "+role);
     }
  
}

module.exports = methods;