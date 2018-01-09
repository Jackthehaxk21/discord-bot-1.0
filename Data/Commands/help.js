var methods = {
    help: function(client, args, message) {
        var help = `
== Help Documents ==

Note : Use mk!usage <command> to get usage information.

== Fun ==
mk!coin      ::   Flip a coin.
mk!dice      ::   Roll a dice.
mk!8ball     ::   Ask 8ball a question.
mk!quote     ::   Get one of 267 quotes.
mk!joke      ::   Get one of 18'000 jokes.
mk!slots     ::   Spin your luck. (cost $50)

== Social ==
mk!level     ::   Display your Level & XP
mk!money     ::   Display your Balance
mk!daily     ::   Get your daily wage !

== Moderation ==
mk!kick      ::   Kick user with a reason
mk!ban       ::   Ban a user
mk!purge     ::   Purge messages.
mk!setrole   ::   Set a role to a user.
mk!remrole   ::   Remove a role from a user.

== Stats & Help ==
mk!help      ::   Shows this again.
mk!stats     ::   Stats for me.
mk!support   ::   Get support from the people that made me.
mk!credits   ::   Learn who helped build me from scrap code.

== Bot-Owner ==
mk!reboot    ::   PRIVATE
mk!eval      ::   PRIVATE
mk!add       ::   PRIVATE

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