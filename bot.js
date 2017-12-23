const Discord = require('discord.js');
const client = new Discord.Client();
var startup = 0;
const fs = require("fs");

//let points = JSON.parse(fs.readFileSync("https://www.jasonbase.com/things/DnBo.json ", "utf8"));
const prefix = "!";

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const defaultChannel = guild.channels.find("name", "bot-announcments");
  defaultChannel.send("Welcome our new user!\n" + member.user);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const defaultChannel = guild.channels.find("name", "bot-announcments");
  defaultChannel.send("Oh No, It looks like " + member.user + " left us !");
});

client.on('ready', () => {
    //client.user.setGame("with my code...");
    client.user.setPresence({game: {name: "with my code...", type: 0}});
    console.log('I am ready!');
    startup = 1;
    //var channel = client.channels.find("name", 'bot');
    //channel.send("Hello @everyone , I am now ready !");
    client.channels.find("name", "bot-announcments").sendMessage("Hello @everyone , Im now online !");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    switch (command) {
        case "embed" :
            const embed = new Discord.RichEmbed()
                .setTitle("This is your title, it can hold 256 characters")
                .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
                /*
                * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                */
                .setColor(0x00AE86)
                .setDescription("This is the main body of text, it can hold 2048 characters.")
                .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
                .setImage("http://i.imgur.com/yVpymuV.png")
                .setThumbnail("http://i.imgur.com/p2qNFag.png")
                /*
                * Takes a Date object, defaults to current date.
                */
                .setTimestamp()
                .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                .addField("This is a field title, it can hold 256 characters",
                    "This is a field value, it can hold 2048 characters.")
                /*
                * Inline fields may not display as inline if the thumbnail and/or image is too big.
                */
                .addField("Inline Field", "They can also be inline.", true)
                /*
                * Blank field, useful to create some space.
                */
                .addBlankField(true)
                .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);

            message.channel.send({embed});
            break;
        case "announce" :
            message.guild.channels.find("name", "announcments").sendMessage(args[0]);
            break;
        case "ping" :
            message.reply('Pong!');
            console.log("Pinged.");
            break;
        case "test" :
            try {
              message.channel.send(args[0]);
              message.channel.send(args[1]);
              message.channel.send(args[2]);
            } catch (e) {
              //message.channel.send(e.toString());
              console.log("test error DW");
            }
            break;
        case "setrole" :
            let check = 0;
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
            let member = message.mentions.members.first();
            let role = message.mentions.roles.first();
            let perms = message.member.permissions;
            let has_perm = message.member.hasPermission("MANAGE_ROLES");
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
                    if(member.roles.has(role)) {
                        message.channel.send("SetRole Success !\n"+member.toString()+" was added to "+role.toString());
                        console.log("SetRole");
                    } else {
                        if (check == 0) {
                            message.channel.send("SetRole Success !\n"+member.toString()+" was added to "+role.toString());
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
            break;
        case "removerole" :
            message.channel.send("test");
            break;
        case "kick" :
            console.log("kick");
            // This command must be limited to mods and admins. In this example we just hardcode the role names.
            // Please read on Array.some() to understand this bit: 
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
            if(!message.member.hasPermission("MANAGE_MEMBERS")) {
                message.reply("Sorry, you don't have permissions to use this!");
                console.log("no perm");
                break;
            }
            // Let's first check if we have a member and if we can kick them!
            // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
            let toKick = message.mentions.members.first();
            if(!toKick) {
                message.reply("Please mention a valid member of this server");
                console.log("No user");
                break;
            }
            if (!toKick.kickable) {
                console.log("Not kickable");
                message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
                break;
            }
            // slice(1) removes the first part, which here should be the user mention!
            let reason = args.slice(1).join(' ');
            if (!reason) {
                console.log("no reason");
                message.reply("Please indicate a reason for the kick!");
                break;
            }
            // Now, time for a swift kick in the nuts!
            try {
                console.log("Kicking...");
                toKick.kick(reason)
            } catch (e) {
                console.log(e);
                message.reply(`Sorry ${message.author} I couldn't kick because of : ${e}`);
            }
            
            message.guild.channels.find("name","bot-announcments").send(`${toKick.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
            break;
        case "purge" :
            const user = message.mentions.users.first()
            const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);
            let perms1 = message.member.permissions;
            let has_perm1 = message.member.hasPermission("MANAGE_MESSAGES");
            message.reply(has_perm1);
            if (!has_perm1) {
              message.reply("Sorry you do not have permission to do that!");
              break;
            }
            if (amount >= 100) {
              message.channel.send("Sorry the amount must be between 3-100");
              break;
            } else {
              if (amount <= 2) {
                message.channel.send("Sorry the amount must be between 3-100");
                break;
              }
            }
            if (!amount) return message.reply('Must specify an amount to delete!');
            if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
            message.channel.fetchMessages({
                limit: amount,
            }).then((messages) => {
                if (user) {
                    const filterBy = user ? user.id : Client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                }
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            });
            break;
        case "quote" :
            var quotes = ["'Don't count the days,\nMake the days count' - Jackthehack21","hard work pays off in the future. Laziness pays off now.'",
"'3 out of 4 people make up 75% of the population.'",
"'24 hours in a day, 24 beers in a case. Coincidence? You decide.'",
"'A banker is a fellow who lends you his umbrella when the sun is shining and wants it back the minute it begins to rain.' - Mark Twain",
"'Accomplishing the impossible means only that the boss will add it to your regular duties.' -Doug Larson",
"'A chicken is an egg's way of making another egg'",
"'A closed mouth gathers no foot.'",
"'A conscience is what hurts when all your other parts feel so good.'",
"'A day for firm decisions! Or is it?'",
"'A device that will cut your fuel bills in half - scissors'",
"'A dog is a dog unless he is facing you. Then he is Mr. Dog.'",
"'A government that robs Peter to pay Paul can always depend on the support of Paul.' -George Bernard Shaw",
"'Always try to make other people happy, even if you have to leave them alone to do it'",
"'A neat desk is a sign of a cluttered desk drawer.'",
"'A neat desk is the sign of a sick mind.'",
"'A sentence is something you should never put a preposition at the end of.'",
"'A signature always reveals a man's character - and sometimes even his name.'",
"'A sine curve goes off to infinity, or at least to the end of the blackboard.'",
"'A sure cure for seasickness is to sit under a tree.' -Spike Milligan.",
"'All men can fly, but sadly, only in one direction - down.'",
"'All my life I wanted to be someone. I guess I should have been more specific.'",
"'Anyone who isn't confused really doesn't understand the situation.' -Edward R. Murrow",
"'Always remember you're unique, just like everyone else.'",
"'Anything worth taking seriously is worth making fun of.'",
"'Artificial intelligence is no match for natural stupidity.'",
"'Beauty is only skin deep, but ugly goes right to the bone'",
"'Before you criticize someone, you should walk a mile in their shoes. That way, when you criticize them, you're a mile away, and you have their shoes'",
"'Be nice to your kids. They'll choose your nursing home.'",
"'Boomerangs are coming back, Ski slopes are going downhill, but Exit signs are on the way out.'",
"'Breaking the law of gravity isn't painful it's getting caught that hurts.'",
"'Caution: do not look into laser with remaining eye.'",
"'Change is inevitable, except from a vending machine.'",
"'Democracy is four wolves and a lamb voting on what to have for lunch.'",
"'Did you know the word gullible is not in the dictionary?'",
"'Diplomacy is the art of saying 'good doggie' while looking for a bigger stick.'",
"'Don't personify computers - we don't like it.'",
"'Don't use a big word where a diminutive one will suffice.'",
"'Don't worry about avoiding temptation - as you grow older, it starts avoiding you.'",
"'Don't worry about the world ending today, it's already tomorrow in Australia'",
"'Eagles may soar, but weasels don't get sucked into jet engines.'",
"'Entertainment is just talking louder than the audience.'",
"'Everyone has a photographic memory, some just don't have film.'",
"'Everyone is someone else's weirdo.'",
"'Experience is something you get just after you need it.'",
"'Free jazz is so called because no-one would ever buy it.'",
"'Frisbeetarianism: The belief that when you die, your soul goes up on the roof and gets stuck.'",
"'Give a man a fish and you feed him for a day. Teach a man to fish, and you can sell him some tackle'",
"Grandma used to say…'Money is not the key to happiness. If you have money you can always have a key made.'",
"'Hangover: The wrath of grapes.'",
"'Happiness makes up in height what it lacks in length.'",
"'As a computer, I find your faith in technology amusing.'",
"'Ask me about my vow of silence.'",
"'Atheism is a non-prophet organisation.'",
"'He who laughs last didn't understand the joke'",
"'He's supposed to sound like he's in pain, he's a folk singer.'",
"'How do you tell when you run out of invisible ink?'",
"'I am not young enough to know everything.' - Oscar Wilde",
"'I didn't say it was your fault. I said I was going to blame you.'",
"'I refuse to have a battle of wits with an unarmed opponent.'",
"'I used to be indecisive, now I'm not so sure.'",
"'I wonder how much deeper the ocean would be without sponges'",
"'If you tell the truth, you don't have to remember anything.'",
"'If you think nobody cares about you, try missing a couple of mortgage payments.'",
"'I'm feeling argumentative. Please contradict me.'",
"'I'm having a deja vu experience, just like last time.'",
"'If it weren't for the last minute, nothing would get done.'",
"'If life was fair, Elvis would be alive and all the impersonators would be dead.' Johnny Carson",
"'If one synchronized swimmer drowns, do the rest have to drown too?'",
"'If today is the first day of the rest of your life, what was yesterday?'",
"'If you ate pasta and antipasta, would you still be hungry?'",
"'If you strangle a smurf, what color does it turn?'",
"'If you lend someone £20, and never see that person again, it was probably worth it.'",
"'If you want someone to catch something, throw it at their nose.'",
"'It doesn't matter how you get there if you don't know where you're going.'",
"'It is dangerous to be right in matters on which the established authorities are wrong.' -Voltaire",
"'It's a small world, but I'd hate to have to paint it.'",
"'It's not the heights that bother me it's falling on the bottoms of them.'",
"'I've got a mind like a.. a.. what's that thing called?'",
"'I've had amnesia for as long as I can remember'",
"'Life is what happens to you while you're busy making other plans.' - John Lennon",
"'Millions yearn for immortality who don't know what to do with themselves on a rainy Sunday afternoon.' - Susan Ertz",
"'My favourite scientific theory is that the rings of Saturn are made of lost airline luggage.'",
"'My supply of brain cells is finally down to a manageable size'",
"'Never ask a barber if he thinks you need a haircut.'",
"'Never attribute to malice what can be adequately explained by stupidity.'",
"'Never test the depth of the water with both feet.'",
"'No issue is so small that it can't be blown out of proportion.' -Stuart Hughes",
"'No one is listening until you make a mistake.'",
"'No problem is so big that you can't run away from it.'",
"'Of course, you may smoke - but please don't exhale.'",
"'On the other hand, I have some fingers.'",
"'Personifiers of the world! Unite! You have nothing to lose but Mr. Dignity!'",
"'Pound for pound, the amoeba is the most vicious animal on earth.'",
"'Rome wasn't built in a day, it just looks like that.'",
"'Smash forehead on keyboard to continue.'",
"'Some days you are the fly, other days you are the windscreen.'",
"'That's OK. I don't remember my name either.'",
"'The amount of sleep needed by the average person is ten minutes more.'",
"'The early bird gets the worm, but the early worm gets eaten.'",
"'The face of a child can say it all, especially the mouth part of the face.'",
"'The lion and the calf shall lie down together but the calf won't get much sleep.' -Woody Allen",
"'The race is not always to the swift, nor the battle to the strong - but that's the way to bet.' - Damon Runyon",
"'The trouble with being punctual is that nobody's there to appreciate it.' -Franklin P. Jones",
"'There are two kinds of people, those who do the work and those who take the credit. Try to be in the first group; there is less competition there.' - Indira Gandhi",
"'There are three kinds of people - those who can count, and those who can't.'",
"'There's no future in time travel.'",
"'Time flies like an arrow, fruit flies like a banana'",
"'To steal ideas from one person is plagiarism; to steal from many is research.'",
"''Veni, Vidi, Velcro' - I came, I saw, I stuck around.'",
"''Veni, Vidi, Visa'. I came. I Saw. I did a little shopping.'",
"'What sets us apart from animals is that we're not afraid of vacuum cleaners.'",
"'When a stupid man is doing something he is ashamed of, he always declares that it is his duty.' -George Bernard Shaw",
"'You don't need an engine to go downhill.'",
"'It's important to have an open mind, but not so open that your brains fall out.'",
"'The DOPELER Effect is the tendency of stupid ideas to seem smarter when they come at you rapidly'",
"'25% of the general population believe in statistics. The other 80% don't trust them at all.'",
"'95% of statistics are just made up anyway.'",
"'A new study shows that licking the sweat off a frog can cure depression. The down side is, the minute you stop licking, the frog gets depressed again.'",
"'Anything not nailed down is mine. Anything I can pry loose is not nailed down.'",
"'I always win. Except when I lose, but then I just don't count it.'",
"'I went to a restaurant that was so expensive that they didn't have prices on the menu - just little faces with varying expressions of horror.'",
"'The person who knows how to laugh at himself will never cease to be amused'",
"'Where in the nursery rhyme does it say Humpty Dumpty is an egg?'",
"'It is impossible to make anything foolproof because fools are so ingenious. '",
"'The trouble with doing something right the first time, is nobody appreciates how difficult it was.'",
"'Everybody lies, but it doesn't matter since nobody listens.'",
"'When I was born, I was so surprised, I couldn't talk for a year and a half!'",
"'To err is human, to blame the next guy even more so. '",
"'There are two rules for success... 1) Never tell everything you know. '",
"'Be nice to other people; they outnumber you 5.5 billion to one. '",
"'Courage is the art of being the only one that knows you're scared to death.' -Earl Wilson",
"'Even if you're on the right track, you'll get run over if you just sit there.' -Will Rogers",
"'I have given up anarchy. Too many rules - hating the government and all that stuff.' -G.H. Hill",
"'The only reason some people get lost in thought because it is unfamiliar territory.'",
"'Talk is cheap because supply exceeds demand'",
"'Start every day off with a smile and get it over with. '",
"'Just because something doesn't do what you planned it to do doesn't mean it's useless.'",
"'There are two kinds of people, those who finish what they start and so on. '",
"'It is the dull man who is always sure, and the sure man who is always dull.' - H. L. Mencken",
"'A great many people think they are thinking when they are merely rearranging their prejudices.' - William James",
"'Half of the people in the world are below average. '",
"'Male zebras have white stripes, female zebras have black stripes.'",
"'Computers are useless. They can only give answers.'",
"'There has been an alarming increase in the number of things you know absolutely nothing about.'",
"'Never keep up with the Joneses. Drag them down to your level. It's cheaper.' -Quentin Crisp",
"'There are only two industries that refer to their customers as 'users'.' -Edward Tufte",
"'I loathe people who keep dogs. They are cowards who haven't got the guts to bite people themselves.' -August Strindberg",
"'Even if you win the rat race, you're still a rat. '",
"'For every problem there is a solution which is simple, neat and wrong. '",
"'Natives who beat drums to drive off evil spirits are objects of scorn to smart people who blow horns to break up traffic jams.'",
"'All sweeping generalisations are wrong.'",
"'I avoid clichés like the plague.'",
"'My sources are unreliable, but their information is fascinating.'",
"'Believe those who seek the truth; doubt those that find it.' -Andre Gide",
"'When you find yourself in a hole, the first thing to do is stop digging.'",
"'Democracy is the worst possible form of government, except for all the others.'",
"'We have the finest politicians that money can buy.'",
"'Never explain -- your Friends do not need it and your enemies will not believe you anyway.'",
"'If it's stupid but works, it isn't stupid.'",
"'It is a miracle that curiosity survives formal education.' - Albert Einstein",
"'I used to know everything, till everything changed.' -Sgt Phil Girvan",
"'You can have peace, or you can have freedom. Don't ever count on having both at once.'",
"'Anything free is worth the price.'",
"'Always listen to experts. They'll tell you what can't be done, and why. Then go and do it anyway.'",
"'All that is necessary for the forces of evil to take root in the world is for enough good men to do nothing.' - Edmund Burke",
"'I find television very educational. Every time someone switches it on I go into another room and read a good book.' -Groucho Marx",
"'Wisdom has two parts: 1) Having a lot to say, and 2) not saying it.'",
"'I'm not stupid. I just have a command of thoroughly useless information.'",
"'People will accept your ideas much more readily if you tell them Benjamin Franklin said it first.'",
"'The two most common elements in the universe are hydrogen and stupidity.' -Isaac Asimov",
"'Compromise is the art of dividing a cake so everyone believes he got the biggest piece.' -Ludwig Erhard",
"'It is the nature of emergencies to be inconvenient.' -Terri Weiner",
"'It's extremely unlucky to be superstitious, for no other reason than it is always unlucky to be colossally stupid.' -Stephen Fry",
"'Opportunity is missed by most people because it is dressed in overalls and looks like work.' -Thomas Edison",
"'Don't go around saying the world owes you a living. The world owes you nothing; it was here first.' -Mark Twain",
"'It's better to be boldly decisive and risk being wrong than to agonize at length and be right too late.' -Marilyn Kennedy",
"'A good plan today is better than a perfect plan tomorrow. -Gen.' George Patton",
"'Man will occassionally stumble over the truth, but most of the time he will pick himself up and continue on.' -Winston Churchill",
"'It is better to have enough ideas for some of them to be wrong than to always be right by having no ideas at all.' -Edward de Bono",
"'The world is moving so fast these days that the man who says it can't be done is generally interrupted by someone doing it.' -Elbert Hubbard",
"'It's a small world, but I wouldn't like to paint it.'",
"'I don't suffer from insanity, I enjoy every minute of it.'",
"'It's lonely at the top, but the food is better.'",
"'Pride is what we have.  Vanity is what others have.'",
"'Give me ambiguity or give me something else.'",
"'Consciousness: that annoying time between naps.'",
"'Why is abbreviation such a long word?'",
"'We have enough youth, how about a fountain of Smart?'",
"'Time is what keeps everything from happening all at once.'",
"'Computers in the future may weigh no more than 1.5 tons.' -Popular Mechanics, 1949",
"'I think there is a world market for maybe five computers.' -Thomas Watson, chairman of IBM, 1943",
"'If you don't find what you want in the Index, look very carefully through the entire catalogue.'",
"'Computers make very fast, very accurate mistakes.'",
"'Computers are not intelligent. They only think they are.'",
"'Imagine if every thursday your shoes exploded if you tied them in the usual way. This happens to us all the time with computers, and nobody thinks of complaining!'",
"'Tell a man there are 300 billion stars in the universe and he'll believe you. Tell him a seat has wet paint on it and he'll have to touch it to be sure.'",
"'If you need anything please don't hesitate to ask someone else first.'",
"'Some mornings, it's just not worth chewing through the leather straps.'",
"'The statistics on sanity are that one out of every four people is suffering from some form of mental illness. Think of your three best friends. If they're okay, then it's you.'",
"'If it weren't for electricity we'd all be watching television by candlelight.'",
"'You cannot have everything. I mean, where would you put it?'",
"'I will not eat oysters. I want my food dead. Not sick, not wounded, dead.' -Woody Allen",
"'If toast always lands butter-side down, and cats always land on their feet, what happens if you drop a buttered cat?'",
"'Nouvelle Cuisine, roughly translated, means: I can't believe I paid ninety-six pounds and I'm still hungry.'",
"'I went to a restaurant that serves 'breakfast at any time'. So I ordered French Toast during the Renaissance.'",
"'I went to a General Store, but they wouldn't sell me anything specific.'",
"'A positive attitude will not solve all your problems, but it will annoy enough people to make it worth the effort.'",
"'This year's Psychic Fair will be held on June 23rd. In the event of rain, it will be held the previous Saturday.'",
"''Of course,' said my grandfather, pulling a gun from his belt as he stepped from the Time Machine, 'There's no paradox if I shoot YOU'.'",
"'In theory, there is no difference between theory and practice. But, in practice, there is.'",
"'The only difference between me and a madman is that I'm not mad.' - Salvador Dali",
"'Never interrupt your enemy when he is making a mistake.' - Napoleon Bonaparte",
"'I have not failed. I've just found 10,000 ways that won't work.' - Thomas Alva Edison",
"'A witty saying proves nothing.' - Voltaire",
"'Some drink at the fountain of knowledge...others just gargle.'",
"'It's not an optical illusion, it just looks that way.'",
"'When all else fails, read the instructions.'",
"'Smile, it makes people wonder what you're thinking.'",
"'Practice makes perfeckt.'",
"'If you can remember the '60s, then you weren't there.'",
"'There is no surer way to ruin a good discussion than to contaminate it with facts.'",
"'I can't make predictions and I never will'",
"'The second best policy is dishonesty'",
"'If it boils and is watched, it can't be a pot.'",
"'I argue very well. Ask any of my remaining friends. I can win an argument on any topic, against any opponent. People know this, and steer clear of me at parties.'",
"'If at first you don't succeed, then skydiving definitely isn't for you.'",
"'If a vegetarian eats vegetables, what does a humanitarian eat?'",
"'How can a slim chance and a fat chance be the same?'",
"'For business reasons, I must maintain the outward signs of sanity.' -Mark Twain",
"'The trouble with the world is that the stupid are cocksure and the intelligent are full of doubt.' - Bertrand Russell",
"'Only newspaper editors and people with tapeworms should ever refer to themselves as, 'we'' - Mark Twain",
"'It is better to remain silent and be thought a fool than to open one's mouth and remove all doubt' - Mark Twain",
"Never preceed anything more complex than a Frisbee throw with, 'Hey boss, watch this!'",
"'It is best to mince one's words very finely, it makes them much easier to eat afterwards.'- Oscar Wilde",
"'Never give up, never give up, never, never, never give up!' - Winston Churchill",
"'Underneath the skin, all humanity are brothers and I would gladly skin humanity alive to prove it.' - Ellsworth Toohey",
"'There is nothing either good or bad, but thinking makes it so.' - Shakespeare",
"'I guess when you turn off the main road, you have to be prepared to see some funny houses.' - Stephen King",
"'Never let your sense of morals prevent you from doing what is right.'",
"'When I was a kid my favorite relative was Uncle Caveman. After school we'd all go play in his cave, and every once in a while he would eat one of us. It wasn't until later that I found out that Uncle Caveman was a bear.'",
"'Take my advice: If the recipe calls for '3 handfuls of lava,' it's really not worth the effort.'",
"'Those are my principles. If you don't like them I have others.' - Groucho Marx.",
"'Beer is proof that God loves us and wants us to be happy' - Benjamin Franklin",
"'There are 10 types of people in this world; those who understand the binary number system and those who do not'",
"'He was a great patriot, a humanitarian, a loyal friend; provided, of course, he really is dead.' - Voltaire.",
"'Outside of the killings, Washington has one of the lowest crime rates in the country' - Mayor Marion Barry, Washington DC",
"'Every time I close the door on reality it comes in through the windows.'",
"'Thirty-five is when you finally get your head together and your body starts falling apart.'",
"'The tragedy of life doesn't lie in not reaching your goal. The tragedy lies in having no goal to reach.'",
"'No great man ever complains of want of opportunity.'",
"'It isn't pollution that's harming the environment, it's the impurities in our air and water that are doing it' - Dan Quayle, Former US Vice President",
"'What if, at this very moment, you are living up to your full potential?'",
"'Sanity calms, but madness is more interesting.'",
"'Don't talk about yourself so much... we'll do that when you leave.'",
"'If you try and don't succeed, cheat. Repeat until caught. Then lie.'",
"'Never say 'OOPS!' always say 'Ah, Interesting!' '",
"'This isn't burger king, you can't have it your way.'",
"'If you must choose between two evils, pick the one you've never tried before.'",
"'Everything that can be invented has been invented.' -Charles H. Duell, Commissioner, U.S. Office of Patents, 1899.",
"'The abdomen, the chest, and the brain will forever be shut from the intrusion of the wise and humane surgeon. -Sir John Eric Ericksen, British surgeon, appointed Surgeon-Extraordinary to Queen Victoria 1873.",
"'Louis Pasteur's theory of germs is ridiculous fiction.'-Pierre Pachet, Professor of Physiology at Toulouse, 1872",
"'Who the hell wants to hear actors talk?' -H.M. Warner, Warner Brothers, 1927.",
"'We don't like their sound, and guitar music is on the way out.' -Decca Recording Co. rejecting the Beatles, 1962.",
"'Heavier-than-air flying machines are impossible.' -Lord Kelvin, president, Royal Society, 1895.",
"'Two times a week, we go to a nice restaurant, a little wine, good food and companionship. She goes Mondays, I go Fridays. '",
"'Women will never be equal to men until they can walk down the street with a bald head and a beer gut, and still think they are beautiful '"];
            var randomAnswer = quotes[Math.floor(Math.random() * quotes.length)];

            message.channel.send(randomAnswer);
            break;
        default:
            message.channel.send("Unkown command use !help\nTo get a list of available commands.")
            break;
    }
    /*message.reply(message.content);
    if (!points[message.author.id]) points[message.author.id] = {
      points: 0,
      level: 0
    };
    let userData = points[message.author.id];
    userData.points++;

    let curLevel = Math.floor(0.3 * Math.sqrt(userData.points));
    if (curLevel > userData.level) {
      // Level up!
      userData.level = curLevel;
      message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
    }
    
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    if (message.content.startsWith(prefix + "level")) {
      message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
    }
    fs.writeFile("./points.json", JSON.stringify(points), (err) => {
      if (err) console.error(err)
    });
    
    if (startup === 1) {
        startup = 0;
    }
    if (message.content.startsWith(prefix + 'ping')) {
    	//message.reply('pong');
        message.channel.send('Pong!');
        console.log('pinged !')
  	}
    if (message.content === '!help') {
        console.log('help documents have been sent to '+message.author)
        message.reply('Documentation has been sent to you via Private Message (PM)')
        message.author.send("Help Documentation for JACKTHEHACK21 (BOT)")
        message.author.send("------------------------------------------")
        message.author.send("!ping - see how fast it takes me to pong !")
        message.author.send("!level - display youre XP AND LEVEL !")
    }
    if (message.content === "!loop") { 
      var interval = setInterval (function () {
        message.channel.send("Thank you for using me !")
      }, 60 * 60000);
    }*/
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
