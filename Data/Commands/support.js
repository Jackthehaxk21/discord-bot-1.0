var methods = {
  
  support: function(message, client) {
    if (message.channel.type == 'dm') {
        let mes = (`

== NOTICE ==

By clicking join you agree to the following ::

MK-SupportStaff may collect information using 'MK' 
and collect any data provided publically and collected privately

MK-SupportStaff are not reliable for any damages this may cause to your servers bot 'MK'
We as a third-party cannot release any details collected using MK.

Your conversations with MK-SupportStaff may be kept for training and security purposes.

----- AS OF 1st January 2018 -----
MK will not collect any private data
----------------------------------

We hope to see you soon ::
`);
        message.channel.send("```asciidoc"+mes+"```");
        var SUPPORT = client.guilds.get("395657844982022145");
        console.log(message.author.tag.replace(/ +/g,'-').replace('#', '_').toLowerCase());
        SUPPORT.createChannel(message.author.tag.replace(/ +/g,'-').replace('#', '_').toLowerCase(), 'text').then(c => {
          SUPPORT.channels.find("name", message.author.tag.replace(/ +/g,'-').replace('#', '_').toLowerCase()).createInvite().then(invite =>
            message.channel.send(invite.url)
          );
        });
    } else {
        message.channel.send("**support** | This command can only be used in DM with me !");
    }
  }
  
}

module.exports = methods;