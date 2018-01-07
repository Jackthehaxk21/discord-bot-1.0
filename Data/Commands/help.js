var methods = {
    help: function(client, args, message) {
        var help = `
== Help Documents ==

Note : Use mk!usage <command> to get usage information.

== Fun ==
mkb!coin      ::   Flip a coin.
mkb!dice      ::   Roll a dice.
mkb!8ball     ::   Ask 8ball a question.
mkb!quote     ::   Get one of 267 quotes.
mkb!joke      ::   Get one of 18'000 jokes.
mkb!slots     ::   Spin your luck. (cost $50)

== Social ==
mkb!level     ::   Display your Level & XP
mkb!money     ::   Display your Balance
mkb!daily     ::   Get your daily wage !

== Moderation ==
mkb!kick      ::   Kick user with a reason
mkb!ban       ::   Ban a user
mkb!purge     ::   Purge messages.
mkb!setrole   ::   Set a role to a user.
mkb!remrole   ::   Remove a role from a user.

== Stats & Help ==
mkb!help      ::   Shows this again.
mkb!stats     ::   Stats for me.
mkb!support   ::   Get support from the people that made me.
mkb!credits   ::   Learn who helped build me from scrap code.

== Bot-Owner ==
mkb!reboot    ::   PRIVATE
mkb!eval      ::   PRIVATE

`;
        message.channel.send(help, {code:'asciidoc'});
  /*
  == YouTube ==
!yt-search ::   Search youtube for a clip.
!yt-play   ::   Play a youtube clip (supply URL).
!yt-stop   ::   Stop playing the clip.
*/
        return;
    },
    
    credits : function(client, args, message) {
        var help = `
==== All Credits ====

Bot-Owner    :: Jackthehaxk21#8860

QA Testers   :: ThatBirdGuyMees#4196
                Jackthehaxk21#8860
                UserBot#1670 [BOT]

Joke Assets  :: taivo@pungas.ee
Quote Assets :: https://gist.github.com/JanGross

==== All Credits ====
`;
        message.channel.send(help, {code:'asciidoc'});
        return;
    }
}

module.exports = methods;