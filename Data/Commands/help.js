var methods = {
    help: function(message) {
        var help = `
== Help Documents ==

Note : Use !usage <command> to get usage information.

== Fun ==
!coin      ::   Flip a coin.
!8ball     ::   Ask 8ball a question.
!rip       ::   R.I.P someone. <Not functional yet>

== Social ==
!level     ::   Display your XP and Lvl.
!money     ::   Display your $ balance.
!daily     ::   Get daily money ($100).
!donate    ::   Give money to another user.

== General ==
!quote     ::   Get one of 267 quotes.
!joke      ::   Get one of 500 jokes.
!follow    ::   Get the role 'Follower'.

== YouTube ==
!yt-search ::   Search youtube for a clip.
!yt-play   ::   Play a youtube clip (supply URL).
!yt-stop   ::   Stop playing the clip.

== Moderation ==
!kick      ::   Kick user with valid reason (most of the time).
!ban       ::   Ban a user
!purge     ::   Purge messages.
!setrole   ::   Set a role to a user.
!remrole   ::   Remove a role from a user.

== Stats & Help ==
!help      ::   Shows this again.
!stats     ::   Stats for me.
!support   ::   Get support from the people that made me.
!credits   ::   Learn who helped build me from scrap code.

== Bot-Owner ==
!reboot    ::   PRIVATE
!eval      ::   PRIVATE

`;
        message.channel.send(help, {code:'asciidoc'});
        return;
    },
    
    credits : function(message) {
        var help = `
==== All Credits ====

Bot-Owner   :: Jackthehaxk21#8860

Inspiration :: York#2400
               goat#9119
               GuideBot#3986 [BOT]

QA Testers  :: ThatBirdGuyMees#4196
               Jackthehaxk21#8860
               UserBot#1670 [BOT]

==== All Credits ====
`;
        message.channel.send(help, {code:'asciidoc'});
        return;
    }
}

module.exports = methods;