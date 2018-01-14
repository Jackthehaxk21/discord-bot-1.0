var methods = {
    help: function(client, args, message, prefix) {
        var help = `
== Help Documents ==

Note : Use ${prefix}usage <command> to get usage information.

== Fun ==
${prefix}coin      ::   Flip a coin.
${prefix}dice      ::   Roll a dice.
${prefix}8ball     ::   Ask 8ball a question.
${prefix}quote     ::   Get one of 267 quotes.
${prefix}joke      ::   Get one of 18'000 jokes.
${prefix}slots     ::   Spin your luck. (cost $50)

== Pictures ==
${prefix}cat       ::   Get a Cat
${prefix}dog       ::   Get a Dog

== NSFW ==
${prefix}neko      ::   Get a Neko
${prefix}pussy     ::   Get a Pussy
${prefix}boobs     ::   Get some Boobs
${prefix}4k        ::   Get a 4k pic

== Social ==
${prefix}level     ::   Display your Level & XP
${prefix}money     ::   Display your Balance
${prefix}daily     ::   Get your daily wage !

== Moderation ==
${prefix}kick      ::   Kick user with a reason
${prefix}ban       ::   Ban a user
${prefix}purge     ::   Purge messages.
${prefix}setrole   ::   Set a role to a user.
${prefix}remrole   ::   Remove a role from a user.

== Stats & Help ==
${prefix}help      ::   Shows this again.
${prefix}stats     ::   Stats for me.
${prefix}support   ::   Get support from the people that made me.
${prefix}credits   ::   Learn who helped build me from scrap code.

== Bot-Owner ==
${prefix}reboot    ::   PRIVATE
${prefix}eval      ::   PRIVATE
${prefix}add       ::   PRIVATE

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