 let methods = {
  run : async function(client, args, message) {
    function clean(text) {
      if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      } else {
        return text;
      }
    }
    if(message.author.id !== process.env.ownerID) {
      message.channel.send('**eval ** | ⚠️ | You are not <@282819886198030336>, You cannot use eval');
      return;
    } else {
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
          message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
          try{
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          } catch(err) {
            console.log(err);
            message.channel.send('**eval** | ☣ | MAJOR ERROR'); 
          }
        } 
      }
  }
}

module.exports = methods;