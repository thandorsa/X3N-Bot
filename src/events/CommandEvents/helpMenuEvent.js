const { EmbedBuilder, Events, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require(`discord.js`);
const guildSettingsSchema = require('../../schemas/prefixSystem');
const { color, getTimestamp } = require('../../utils/loggingEffects');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client, err) {

        const helprow2 = new ActionRowBuilder()
            .addComponents(

                new StringSelectMenuBuilder()
                .setMinValues(1)
                .setMaxValues(1)
                .setCustomId('selecthelp')
                .setPlaceholder('• Select a menu')
                .addOptions(
                    {
                        label: '• Help Center',
                        description: 'Navigate to the Help Center.',
                        value: 'helpcenter',
                    },

                    {
                        label: '• How to add the bot',
                        description: `Displays how to add ${client.user.username} to your amazing server.`,
                        value: 'howtoaddbot'
                    },

                    {
                        label: '• Feedback',
                        description: `Displays how to contribute to the development of ${client.user.username} by giving feedback.`,
                        value: 'feedback'
                    },

                    {
                        label: '• Commands Help',
                        description: 'Navigate to the Commands help page.',
                        value: 'commands',
                    },
                    {
                        label: '• Prefix Commands Help',
                        description: 'Navigate to the Prefix Commands help page.',
                        value: 'pcommands',
                    }
                ),
            );

        if (!interaction.isStringSelectMenu()) return;
        if (interaction.customId === 'selecthelp') {
            let choices = "";
            const fetchGuildPrefix = await guildSettingsSchema.findOne({ Guild: interaction.guild.id });
            const guildPrefix = fetchGuildPrefix.Prefix;

            const centerembed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
            .setAuthor({ name: `🚑 Help Command ${client.config.devBy}`})
            .setFooter({ text: `🚑 ${client.user.username}'s help center`})
            .setThumbnail(client.user.avatarURL())
            .addFields({ name: `• Commands Help`, value: `> Get all **Commands** (**${client.commands.size}** slash & **${client.pcommands.size}** prefix) ${client.user.username} looks over!`})
            .addFields({ name: `• What's my prefix?`, value: `> The prefix for **${interaction.guild.name}** is \`\`${guildPrefix}\`\``})
            .addFields({ name: "• How to add Bot", value: `> Quick guide on how to add our **${client.user.username}** \n> to your server.`})
            .addFields({ name: "• Feedback", value: "> How to send us feedback and suggestions."})
            .addFields({ name: "• Exclusive Functionality", value: `> Guide on how to receive permission to \n> use exclusive functionality (${client.user.username} Beta version).`})
            .setTimestamp();

            interaction.values.forEach(async (value) => {
                choices += `${value}`;

                if (value === 'helpcenter') {

                    setTimeout(() => {
                        interaction.update({ embeds: [centerembed] }).catch(err);
                    }, 100)

                }

                if (value === 'howtoaddbot') {

                    setTimeout(() => {
                        const howtoaddembed = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setDescription(`> **How to add ${client.user.username} to your server**`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}`})
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Adding bot`})
                        .setThumbnail(client.user.avatarURL())
                        .addFields({ name: `• How to add ${client.user.username} to your server`, value: `> To add ${client.user.username} to your server, simple click on the bots profile and click, \`\`add app\`\`.` })
                        .addFields({ name: "• Wait.. what Official Discord server..", value: "> This is our Discord server: https://discord.gg/nuMfnnxbF4" })
                        .addFields({ name: "• Our official website..", value: "> This is our official website: https://www.thandographx.xyz/ "})
                        .setTimestamp();

                        interaction.update({ embeds: [howtoaddembed] }).catch(err);
                    }, 100)
                }

                if (value === 'feedback') {

                    setTimeout(() => {
                        const feedbackembed = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setDescription(`> **How to give feedback on ${client.user.username}**`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Sending feedback` })
                        .setThumbnail(client.user.avatarURL())
                        .addFields({ name: "• How can I give Feedback?", value: `> The creator of ${client.user.username} appreciates your opinion on our the bot. To send feedback or suggestions, use the command below. \n > Alternatively, if you spot or come across a bug, be sure to report it to us with the command below.` })
                        .addFields({ name: "• /suggestion", value: "> Opens up a suggestion form" })
                        .addFields({ name: "• /bug-report", value: "> Opens a bug report" })
                        .setTimestamp();

                        interaction.update({ embeds: [feedbackembed] }).catch(err);
                    }, 100)
                }

                if (value === 'commands') {

                    const commandpage1 = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Commands Page 1` })
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`> **Commands Help Page \`\`1\`\`**`)
                        .addFields({ name: "• /account-view", value: "> View your economy account information." })
                        .addFields({ name: "• /add emoji", value: "> Adds an emoji to the server." })
                        .addFields({ name: "• /add sticker", value: "> Adds a sticker to the server." })
                        .addFields({ name: "• /advice", value: "> Gives you a random piece of advice." })
                        .addFields({ name: "• /animal-facts", value: "> Gives you a random animal fact." })
                        .addFields({ name: "• /announce", value: "> Announces a message in a specified channel." })
                        .addFields({ name: "• /ascii", value: "> Converts text to ascii." })
                        .addFields({ name: "• /automod flagged-words", value: "> Sets up the automod system for flagged words." })
                        .addFields({ name: "• /automod keyword", value: "> Sets up the automod system for keywords." })
                        .addFields({ name: "• /automod mention-spam", value: "> Sets up the automod system for mention-spam." })
                        .addFields({ name: "• /automod spam-messages", value: "> Sets up the automod system for spam-messages." })
                        .addFields({ name: "• /autorole-add", value: "> Adds a role to the autorole system." })
                        .addFields({ name: "• /autorole-disable", value: "> Disables the autorole system." })
                        .addFields({ name: "• /autorole-enable", value: "> Enables the autorole system." })
                        .addFields({ name: "• /autorole-remove", value: "> Removes a role from the autorole system." })
                        .addFields({ name: "• /avatar", value: "> Shows a users avatar." })
                        .addFields({ name: "• /ban", value: "> Bans a user for a specified reason." })
                        .addFields({ name: "• /beg", value: "> Beg for money. Results may vary." })
                        .addFields({ name: "• /bot-specs", value: "> Shows the bots specifications." })
                        .addFields({ name: "• /bot-uptime", value: "> Shows the bots current uptimes." })
                        .addFields({ name: "• /bug-report", value: "> Opens a bug report." })
                        .addFields({ name: "• /calculate", value: "> Calculates a math problem." })
                        .addFields({ name: "• /chat", value: "> Chat with an AI modal." })
                        .addFields({ name: "• /change-prefix", value: "> Changes the bots prefix in your server." })
                        .addFields({ name: "• /clear", value: "> Clears a specified amount of messages." })

                        .setImage('https://i.postimg.cc/8CbGp6D5/Screenshot-300.png')
                        .setTimestamp();

                    const commandpage2 = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Commands Page 2` })
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`> **Commands Help Page \`\`2\`\`**`)
                        .addFields({ name: "• /counting disable", value: "> Disables the counting system." })
                        .addFields({ name: "• /counting enable", value: "> Enables the counting system." })
                        .addFields({ name: "• /create embed", value: "> Creates an embed." })
                        .addFields({ name: "• /create thread", value: "> Creates a thread." })
                        .addFields({ name: "• /dad-joke", value: "> Tells a dad joke." })
                        .addFields({ name: "• /daily", value: "> Collect your daily reward." })
                        .addFields({ name: "• /deposit", value: "> Deposits a specified amount of balance to the bank." })
                        .addFields({ name: "• /dictionary", value: "> Searches the dictionary for a word." })
                        .addFields({ name: "• /economy-create account", value: "> Creates an economy account." })
                        .addFields({ name: "• /economy-delete account", value: "> Deletes an economy account." })
                        .addFields({ name: "• /fake-tweet", value: "> Creates a fake tweet." })
                        .addFields({ name: "• /fast-type", value: "> Starts a fast type game." })
                        .addFields({ name: "• /gamble", value: "> Gambles a specified amount of balance." })
                        .addFields({ name: "• /give currency", value: "> Gives a specified user a specified amount of currency." })
                        .addFields({ name: "• /give xp", value: "> Gives a specified user a specified amount of XP." })
                        .addFields({ name: "• /giveaway edit", value: "> edits the current giveaway." })
                        .addFields({ name: "• /giveaway end", value: "> Ends the current giveaway." })
                        .addFields({ name: "• /giveaway reroll", value: "> Rerolls the current giveaway." })
                        .addFields({ name: "• /giveaway start", value: "> Starts a giveaway." })
                        .addFields({ name: "• /guess the pokemon", value: "> Starts a game of guess the pokemon." })
                        .addFields({ name: "• /hack", value: "> Hacks a user (fake)." }) 
                        .addFields({ name: "• /help manual", value: "> Displays the help menu." })
                        .addFields({ name: "• /help server", value: "> Displays the help server." })
                        .addFields({ name: "• /how drunk", value: "> Displays how drunk you are." })
                        .addFields({ name: "• /how gay", value: "> Displays how gay you are." })

                        .setImage('https://i.postimg.cc/8CbGp6D5/Screenshot-300.png')
                        .setTimestamp();

                    const commandpage3 = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Commands Page 3` })
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`> **Commands Help Page \`\`3\`\`**`)
                        .addFields({ name: "• /how high", value: "> Displays how high you are." })
                        .addFields({ name: "• /how simp", value: "> Displays how much of a simp you are." })
                        .addFields({ name: "• /how stupid", value: "> Displays how stupid you are." })
                        .addFields({ name: "• /how sus", value: "> Displays how sus you are." })
                        .addFields({ name: "• /impersonate", value: "> Impersonates a user." })
                        .addFields({ name: "• /iq", value: "> Displays your IQ." })
                        .addFields({ name: "• /khalid-quote", value: "> Displays a random Khalid quote." })
                        .addFields({ name: "• /kick", value: "> Kicks a user for a specified reason." })
                        .addFields({ name: "• /latency", value: "> Displays the bots latency." })
                        .addFields({ name: "• /leaderboard", value: "> Displays the server leaderboard." })
                        .addFields({ name: "• /leveling-system disable", value: "> Disables leveling for the server." })
                        .addFields({ name: "• /leveling-system disable-multiplier", value: "> Disables the leveling multiplier." })
                        .addFields({ name: "• /leveling-system enable", value: "> Enables leveling for the server." })
                        .addFields({ name: "• /leveling-system role-multiplier", value: "> Sets up a leveling multiplier role." })
                        .addFields({ name: "• /lock", value: "> Locks a channel." })
                        .addFields({ name: "• /logs-disable", value: "> Disables the logs." })
                        .addFields({ name: "• /logs-setup", value: "> Enables the logs." })
                        .addFields({ name: "• /lyrics", value: "> Displays the lyrics of a song." })
                        .addFields({ name: "• /master-oogway", value: "> Generate a quote from master oogway." })
                        .addFields({ name: "• /member-count", value: "> Displays the server member count." })
                        .addFields({ name: "• /members-vc bot-remove", value: "> Disables the total bots voice channel." })
                        .addFields({ name: "• /members-vc bot-set", value: "> Sets up the total bots voice channel." })
                        .addFields({ name: "• /members-vc total-remove", value: "> Disables the total members voice channel." })
                        .addFields({ name: "• /members-vc total-set", value: "> Sets up the total members voice channel." })
                        .addFields({ name: "• /meme", value: "> Displays a random meme." })

                        .setImage('https://i.postimg.cc/8CbGp6D5/Screenshot-300.png')
                        .setTimestamp();

                    const commandpage4 = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Commands Page 4` })
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`> **Commands Help Page \`\`4\`\`**`)
                        .addFields({ name: "• /minecraft-server", value: "> Displays information about a minecraft server." })
                        .addFields({ name: "• /minecraft-skin", value: "> Displays the skin of a minecraft user." })
                        .addFields({ name: "• /minigame 2048", value: "> Starts a game of 2048." })
                        .addFields({ name: "• /minigame connect4", value: "> Starts a game of connect4." })
                        .addFields({ name: "• /minigame find-emoji", value: "> Starts a game of find-emoji." })
                        .addFields({ name: "• /minigame flood", value: "> Starts a game of flood-it." })
                        .addFields({ name: "• /minigame hangman", value: "> Starts a game of hangman." })
                        .addFields({ name: "• /minigame match-pairs", value: "> Starts a game of match-pairs." })
                        .addFields({ name: "• /minigame minesweeper", value: "> Starts a game of minesweeper." })
                        .addFields({ name: "• /minigame rps", value: "> Starts a game of rock-paper-scissors." })
                        .addFields({ name: "• /minigame slots", value: "> Starts a game of slots." })
                        .addFields({ name: "• /minigame snake", value: "> Starts a game of snake." })
                        .addFields({ name: "• /minigame tictactoe", value: "> Starts a game of tictactoe." })
                        .addFields({ name: "• /minigame wordle", value: "> Starts a game of wordle." })
                        .addFields({ name: "• /minigame would-you-rather", value: "> Starts a game of would you rather." })
                        .addFields({ name: "• /mod-panel", value: "> Opens the moderation panel." })
                        .addFields({ name: "• /movie-tracker", value: "> Displays info about a given movie" })
                        .addFields({ name: "• /mute", value: "> Mutes a user for a specified reason." })
                        .addFields({ name: "• /nick", value: "> Changes a users nickname." })
                        .addFields({ name: "• /nitro", value: "> Generates a nitro code. (fake)" })
                        .addFields({ name: "• /pepe-sign", value: "> Generates a pepe sign." })
                        .addFields({ name: "• /permissions", value: "> Displays a users permissions." })
                        .addFields({ name: "• /ping", value: "> Displays the bots ping." })
                        .addFields({ name: "• /pp-size", value: "> Displays your pp size." })

                        .setImage('https://i.postimg.cc/8CbGp6D5/Screenshot-300.png')
                        .setTimestamp();

                    const commandpage5 = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Commands Page 5` })
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`> **Commands Help Page \`\`5\`\`**`)
                        .addFields({ name: "• /profile-create", value: "> Creates a users profile." })
                        .addFields({ name: "• /profile-edit", value: "> Edits a users profile." })
                        .addFields({ name: "• /profile-view", value: "> Views a users profile." })
                        .addFields({ name: "• /radio", value: "> Plays a radio station in a voice channel." })
                        .addFields({ name: "• /rank", value: "> Displays a users rank." })
                        .addFields({ name: "• /relationship-checker", value: "> Displays a users relationship status with another user." })
                        .addFields({ name: "• /reset all-currency", value: "> Resets all economy currency for the server." })
                        .addFields({ name: "• /reset all-xp", value: "> Resets all economy XP for the server." })
                        .addFields({ name: "• /reset currency", value: "> Resets a users economy currency." })
                        .addFields({ name: "• /reset xp", value: "> Resets a users economy XP." })
                        .addFields({ name: "• /rob", value: "> Robs a user for a specified amount." })
                        .addFields({ name: "• /role-add", value: "> Adds a role to a user." })
                        .addFields({ name: "• /role-remove", value: "> Removes a role from a user." })
                        .addFields({ name: "• /role-info", value: "> Displays information about a role." })
                        .addFields({ name: "• /say", value: "> Makes the bot say a message." })
                        .addFields({ name: "• /server-info", value: "> Displays information about the server." })
                        .addFields({ name: "• /slow-mode-check", value: "> Checks the slowmode of a channel." })
                        .addFields({ name: "• /slow-mode-off", value: "> Disables the slowmode of a channel." })
                        .addFields({ name: "• /slow-mode-set", value: "> Sets the slowmode of a channel." })
                        .addFields({ name: "• /soundboard", value: "> Plays a sound in a voice channel." })
                        .addFields({ name: "• /spotify", value: "> Displays information about a spotify track the users listing to." })
                        .addFields({ name: "• /sticky-message-check", value: "> Displays active sticky message(s)." })
                        .addFields({ name: "• /sticky-message-disable", value: "> Disables the sticky message system." })
                        .addFields({ name: "• /sticky-message-enable", value: "> Enables the sticky message system." })
                        .addFields({ name: "• /suggest", value: "> Suggests a feature for the bot." })
                        
                        .setImage('https://i.postimg.cc/8CbGp6D5/Screenshot-300.png')
                        .setTimestamp();

                    const commandpage6 = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Commands Page 6` })
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`> **Commands Help Page \`\`6\`\`**`)
                        .addFields({ name: "• /test", value: "> Tests the bot." })
                        .addFields({ name: "• /translate", value: "> Translates a message." })
                        .addFields({ name: "• /tts", value: "> Text to speech." })
                        .addFields({ name: "• /unban", value: "> Unbans a user." })
                        .addFields({ name: "• /unlock", value: "> Unlocks a channel." })
                        .addFields({ name: "• /unmute", value: "> Unmutes a user." })
                        .addFields({ name: "• /user-info", value: "> Displays information about a user." })
                        .addFields({ name: "• /verify-disable", value: "> Disables the verification system." })
                        .addFields({ name: "• /verify-setup", value: "> Enables the verification system." })
                        .addFields({ name: "• /warn clear", value: "> Warns a user." })
                        .addFields({ name: "• /warn create", value: "> Creates a warning." })
                        .addFields({ name: "• /warn edit", value: "> Edits a warning." })
                        .addFields({ name: "• /warn info", value: "> Displays information about a warning." })
                        .addFields({ name: "• /warn list", value: "> Lists all warnings." })
                        .addFields({ name: "• /warn remove", value: "> Removes a warning." })
                        .addFields({ name: "• /welcome-system remove", value: "> Disables the welcome system." })
                        .addFields({ name: "• /welcome-system set", value: "> Enables the welcome system." })
                        .addFields({ name: "• /wiki", value: "> Searches wikipedia for a query." })
                        .addFields({ name: "• /wipe-user-data", value: "> Wipes a users data." })
                        .addFields({ name: "• /withdraw", value: "> Withdraws a specified amount of balance from the bank." })
                        .addFields({ name: "• /work", value: "> Work for money." })

                        .setImage('https://i.postimg.cc/8CbGp6D5/Screenshot-300.png')
                        .setTimestamp();

                    const commandpage7 = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Commands Page 7` })
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`> **Commands Help Page \`\`7\`\`**`)
                        .addFields({ name: '• /prefix change', value: '> Changes the bots prefix.'})
                        .addFields({ name: '• /prefix reset', value: '> Resets the bots prefix.'})
                        .addFields({ name: '• /prefix check', value: '> Checks the bots prefix.'})
                        .addFields({ name: '• /ytmp3', value: '> Converts a youtube video to mp3.'})
                        .addFields({ name: '• /bot-stats-channel set', value: '> Sets the bot stats channel.'})
                        .addFields({ name: '• /bot-stats-channel remove', value: '> Removes the bot stats channel and message.'})
                        .addFields({ name: '• /ai image-generate', value: '> Generates an image using AI.'})
                        .addFields({ name: '• /ai chat', value: '> Generates text using AI.'})
                        .addFields({ name: '• /ai image-analyser', value: '> Analyses an image using AI.'})
                        .addFields({ name: '• /ai setup-channel', value: '> Sets up channel for AI responses.'})
                        .addFields({ name: '• /ai disable-channel', value: '> Removes channel for AI responses.'})
                        .addFields({ name: '• /ai update-ai-instructions', value: '> Updates the instructions for the AI in the AI channel.'})

                        .setImage('https://i.postimg.cc/8CbGp6D5/Screenshot-300.png')
                        .setTimestamp(); 

                    const commandbuttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('helpcenterbutton')
                                .setLabel('Help Center')
                                .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                .setCustomId('first')
                                .setLabel('◀◀')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Primary),

                            new ButtonBuilder()
                                .setCustomId('pageleft')
                                .setLabel('◀')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                                .setCustomId('pageright')
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId('last')
                                .setLabel('▶▶')
                                .setStyle(ButtonStyle.Primary)
                        );

                    const commandbuttons1 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('helpcenterbutton1')
                                .setLabel('Help Center')
                                .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                .setCustomId('first')
                                .setLabel('◀◀')
                                .setStyle(ButtonStyle.Primary),

                            new ButtonBuilder()
                                .setCustomId('pageleft1')
                                .setLabel('◀')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                                .setCustomId('pageright1')
                                .setDisabled(false)
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId('last')
                                .setLabel('▶▶')
                                .setStyle(ButtonStyle.Primary)
                            );

                        const commandbuttons2 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('helpcenterbutton2')
                                .setLabel('Help Center')
                                .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                .setCustomId('first')
                                .setLabel('◀◀')
                                .setStyle(ButtonStyle.Primary),

                            new ButtonBuilder()
                                .setCustomId('pageleft2')
                                .setLabel('◀')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                                .setCustomId('pageright2')
                                .setDisabled(false)
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId('last')
                                .setLabel('▶▶')
                                .setStyle(ButtonStyle.Primary)
                        );

                    const commandbuttons3 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('helpcenterbutton3')
                                .setLabel('Help Center')
                                .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                .setCustomId('first')
                                .setLabel('◀◀')
                                .setStyle(ButtonStyle.Primary),

                            new ButtonBuilder()
                                .setCustomId('pageleft3')
                                .setLabel('◀')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                                .setCustomId('pageright3')
                                .setDisabled(false)
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId('last')
                                .setLabel('▶▶')
                                .setStyle(ButtonStyle.Primary)
                        );

                    const commandbuttons4 = new ActionRowBuilder()
                        .addComponents(

                            new ButtonBuilder()
                                .setCustomId('helpcenterbutton4')
                                .setLabel('Help Center')   
                                .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                .setCustomId('first')
                                .setLabel('◀◀')
                                .setStyle(ButtonStyle.Primary),

                            new ButtonBuilder()
                                .setCustomId('pageleft4')
                                .setLabel('◀')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                                .setCustomId('pageright4')
                                .setDisabled(false)
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                                .setCustomId('last')
                                .setLabel('▶▶')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Primary)
                                
                        );
                    
                        const commandbuttons5 = new ActionRowBuilder()
                        .addComponents(

                            new ButtonBuilder()
                                .setCustomId('helpcenterbutton5')
                                .setLabel('Help Center')   
                                .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                .setCustomId('first')
                                .setLabel('◀◀')
                                .setStyle(ButtonStyle.Primary),

                            new ButtonBuilder()
                                .setCustomId('pageleft5')
                                .setLabel('◀')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                                .setCustomId('pageright5')
                                .setDisabled(false)
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                                .setCustomId('last')
                                .setLabel('▶▶')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Primary)
                                
                        );

                        const commandbuttons6 = new ActionRowBuilder()
                        .addComponents(

                            new ButtonBuilder()
                                .setCustomId('helpcenterbutton6')
                                .setLabel('Help Center')   
                                .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                .setCustomId('first')
                                .setLabel('◀◀')
                                .setStyle(ButtonStyle.Primary),

                            new ButtonBuilder()
                                .setCustomId('pageleft6')
                                .setLabel('◀')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                                .setCustomId('pageright6')
                                .setDisabled(true)
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                                .setCustomId('last')
                                .setLabel('▶▶')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Primary)
                                
                        );


                    await interaction.update({ embeds: [commandpage1], components: [commandbuttons] }).catch(err);
                    const collector = interaction.message.createMessageComponentCollector({ componentType: ComponentType.Button });

                    collector.on('collect', async (i, err) => {

                        if (i.customId === 'last') {
                            i.update({ embeds: [commandpage7], components: [commandbuttons6] }).catch(err);
                        } 

                        if (i.customId === 'first') {
                            i.update({ embeds: [commandpage1], components: [commandbuttons] }).catch(err);
                        }

                        if (i.customId === 'helpcenterbutton') {
                            i.update({ embeds: [centerembed], components: [helprow2] }).catch(err);
                        }

                        if (i.customId === 'pageleft') { 
                            i.update({ embeds: [commandpage1], components: [commandbuttons] }).catch(err);
                        }

                        if (i.customId === 'pageright') { 
                            i.update({ embeds: [commandpage2], components: [commandbuttons1] }).catch(err);
                        }

                        if (i.customId === 'helpcenterbutton1') {
                            i.update({ embeds: [centerembed], components: [helprow2] }).catch(err);
                        }

                        if (i.customId === 'pageright1') {
                            i.update({ embeds: [commandpage3], components: [commandbuttons2] }).catch(err);
                        }

                        if (i.customId === 'pageleft1') {
                            i.update({ embeds: [commandpage1], components: [commandbuttons] }).catch(err);
                        }

                        if (i.customId === 'helpcenterbutton2') {
                            i.update({ embeds: [centerembed], components: [helprow2] }).catch(err);
                        }

                        if (i.customId === 'pageright2') {
                            i.update({ embeds: [commandpage4], components: [commandbuttons3] }).catch(err);
                        }

                        if (i.customId === 'pageleft2') {
                            i.update({ embeds: [commandpage2], components: [commandbuttons1] }).catch(err);
                        }

                        if (i.customId === 'helpcenterbutton3') {
                            i.update({ embeds: [centerembed], components: [helprow2] }).catch(err)
                        }

                        if (i.customId === 'pageright3') {
                            i.update({ embeds: [commandpage5], components: [commandbuttons4] }).catch(err);
                        }

                        if (i.customId === 'pageleft3') {
                            i.update({ embeds: [commandpage3], components: [commandbuttons2] }).catch(err);
                        }

                        if (i.customId === 'helpcenterbutton4') {
                            i.update({ embeds: [centerembed], components: [helprow2] }).catch(err);
                        }

                        if (i.customId === 'pageright4') {
                            i.update({ embeds: [commandpage6], components: [commandbuttons5] }).catch(err);
                        } 

                        if (i.customId === 'pageleft4') {
                            i.update({ embeds: [commandpage4], components: [commandbuttons3] }).catch(err);
                        }

                        if (i.customId === 'helpcenterbutton5') {
                            i.update({ embeds: [centerembed], components: [helprow2] }).catch(err);
                        }

                        if (i.customId === 'pageright5') {
                            i.update({ embeds: [commandpage7], components: [commandbuttons6] }).catch(err);
                        } 

                        if (i.customId === 'pageleft5') {
                            i.update({ embeds: [commandpage5], components: [commandbuttons4] }).catch(err);
                        }

                        if (i.customId === 'helpcenterbutton6') {
                            i.update({ embeds: [centerembed], components: [helprow2] }).catch(err);
                        }

                        if (i.customId === 'pageright6') {
                            i.update({ embeds: [commandpage7], components: [commandbuttons6] }).catch(err);
                        } 

                        if (i.customId === 'pageleft6') {
                            i.update({ embeds: [commandpage6], components: [commandbuttons5] }).catch(err);
                        } 
                    });
                }

                if (value === 'pcommands') {

                    const fetchGuildPrefix = await guildSettingsSchema.findOne({ Guild: interaction.guild.id });
                    const guildPrefix = fetchGuildPrefix.Prefix;

                    const pcommandpage = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Prefix Commands Page 1` })
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`> **Prefix Commands Help Page \`\`1\`\`**`)
                        .addFields({ name: `• ${guildPrefix}animalfacts`, value: `> Gives you a random animal fact.` })
                        .addFields({ name: `• ${guildPrefix}meme`, value: `> Displays a random meme.` })
                        .addFields({ name: `• ${guildPrefix}beg`, value: `> Beg for money. Results may vary.` })
                        .addFields({ name: `• ${guildPrefix}daily`, value: `> Collect your daily reward.` })
                        .addFields({ name: `• ${guildPrefix}work`, value: `> Work for money.` })
                        .addFields({ name: `• ${guildPrefix}account`, value: `> View your economy account information.` })
                        .addFields({ name: `• ${guildPrefix}cprefix`, value: `> Changes the bots prefix.` })
                        .addFields({ name: `• ${guildPrefix}dad-joke`, value: `> Tells a dad joke.` })
                        .addFields({ name: `• ${guildPrefix}iq`, value: `> Displays your IQ.` })
                        .addFields({ name: `• ${guildPrefix}nitro`, value: `> Generates a nitro code. (fake)` })
                        .addFields({ name: `• ${guildPrefix}rc`, value: `> Displays a relationship checker.` })
                        .addFields({ name: `• ${guildPrefix}ban`, value: `> Bans a user` })
                        .addFields({ name: `• ${guildPrefix}kick`, value: `> Kicks a user` })
                        .addFields({ name: `• ${guildPrefix}unban`, value: `> Unbans a user` })
                        .addFields({ name: `• ${guildPrefix}pfp`, value: `> Displays a users profile picture` })
                        .addFields({ name: `• ${guildPrefix}bot-specs`, value: `> Shows the bots specifications.` })
                        .addFields({ name: `• ${guildPrefix}bot-info`, value: `> Shows the bots information.` })
                        .addFields({ name: `• ${guildPrefix}member-graph`, value: `> Displays the server member graph.` })
                        .addFields({ name: `• ${guildPrefix}perms`, value: `> Displays a users permissions.` })
                        .addFields({ name: `• ${guildPrefix}serverinfo`, value: `> Displays the server information.` })
                        .addFields({ name: `• ${guildPrefix}userinfo`, value: `> Displays a users information.` })
                        .addFields({ name: `• ${guildPrefix}roleinfo`, value: `> Displays a roles information.` })
                        .addFields({ name: `• ${guildPrefix}uptime`, value: `> Shows the bots uptime.` })
                        .addFields({ name: `• ${guildPrefix}lb`, value: `> Displays the server leaderboard.` })
                        .addFields({ name: `• ${guildPrefix}rank`, value: `> Displays a users rank.` })

                        .setImage('https://i.postimg.cc/TPTDJZt7/Screenshot-2024-06-22-211847.png')
                        .setTimestamp();

                    const pcommandpage1 = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setTitle(`${client.user.username} Help Center ${client.config.arrowEmoji}`)
                        .setAuthor({ name: `🚑 Help Command ${client.config.devBy}` })
                        .setFooter({ text: `🚑 ${client.user.username}'s help center: Prefix Commands Page 2` })
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`> **Prefix Commands Help Page \`\`2\`\`**`)
                        .addFields({ name: `• ${guildPrefix}addrole`, value: `> Adds a role to a user.` })
                        .addFields({ name: `• ${guildPrefix}removerole`, value: `> Removes a role from a user.` })
                        .addFields({ name: `• ${guildPrefix}nick`, value: `> Changes a users nickname.` })
                        .addFields({ name: `• ${guildPrefix}clear`, value: `> Clears a specified amount of messages.` })
                        .addFields({ name: `• ${guildPrefix}autoplay`, value: `> Toggles autoplay for the music system.` })
                        .addFields({ name: `• ${guildPrefix}filter`, value: `> Toggles the music filter.` })
                        .addFields({ name: `• ${guildPrefix}forward`, value: `> Forwards the music.` })
                        .addFields({ name: `• ${guildPrefix}join`, value: `> Makes the bot join a voice channel.` })
                        .addFields({ name: `• ${guildPrefix}leave`, value: `> Makes the bot leave a voice channel.` })
                        .addFields({ name: `• ${guildPrefix}np`, value: `> Shows the currently playing song.` })
                        .addFields({ name: `• ${guildPrefix}pause`, value: `> Pauses the music.` })
                        .addFields({ name: `• ${guildPrefix}play`, value: `> Plays a song.` })
                        .addFields({ name: `• ${guildPrefix}playskip`, value: `> Plays a song and skips the current song.` })
                        .addFields({ name: `• ${guildPrefix}playtop`, value: `> Plays the top song in queue.` })
                        .addFields({ name: `• ${guildPrefix}previous`, value: `> Plays the previous song.` })
                        .addFields({ name: `• ${guildPrefix}queue`, value: `> Shows the music queue.` })
                        .addFields({ name: `• ${guildPrefix}repeat`, value: `> Toggles repeat for the music system.` })
                        .addFields({ name: `• ${guildPrefix}resume`, value: `> Resumes the music.` })
                        .addFields({ name: `• ${guildPrefix}rewind`, value: `> Rewinds the music.` })
                        .addFields({ name: `• ${guildPrefix}seek`, value: `> Seeks the music.` })
                        .addFields({ name: `• ${guildPrefix}shuffle`, value: `> Shuffles the music queue.` })
                        .addFields({ name: `• ${guildPrefix}skip`, value: `> Skips the current song.` })
                        .addFields({ name: `• ${guildPrefix}skipto`, value: `> Skips to a specified song.` })
                        .addFields({ name: `• ${guildPrefix}stop`, value: `> Stops the music.` })
                        .addFields({ name: `• ${guildPrefix}volume`, value: `> Changes the music volume.` })

                        .setImage('https://i.postimg.cc/TPTDJZt7/Screenshot-2024-06-22-211847.png')
                        .setTimestamp();

                    const pcommandbuttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('pcommand-helpcenterbutton')
                                .setLabel('Help Center')
                                .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                .setCustomId('pcommand-first')
                                .setLabel('◀◀')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Primary),

                            new ButtonBuilder()
                                .setCustomId('pcommand-pageleft')
                                .setLabel('◀')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                                .setCustomId('pcommand-pageright')
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId('pcommand-last')
                                .setLabel('▶▶')
                                .setStyle(ButtonStyle.Primary)
                        );

                    const pcommandbuttons1 = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('pcommand-helpcenterbutton1')
                                .setLabel('Help Center')
                                .setStyle(ButtonStyle.Success),

                                new ButtonBuilder()
                                .setCustomId('pcommand-first')
                                .setLabel('◀◀')
                                .setStyle(ButtonStyle.Primary),

                            new ButtonBuilder()
                                .setCustomId('pcommand-pageleft1')
                                .setLabel('◀')
                                .setDisabled(false)
                                .setStyle(ButtonStyle.Secondary),

                            new ButtonBuilder()
                                .setCustomId('pcommand-pageright1')
                                .setDisabled(false)
                                .setLabel('▶')
                                .setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder()
                                .setCustomId('pcommand-last')
                                .setLabel('▶▶')
                                .setStyle(ButtonStyle.Primary)
                            );
                        
                    await interaction.update({ embeds: [pcommandpage], components: [pcommandbuttons] }).catch(err);
                    const collector = interaction.message.createMessageComponentCollector({ componentType: ComponentType.Button });

                    collector.on('collect', async (i, err) => {
                        try {

                            await i.deferUpdate();

                            if (i.customId === 'pcommand-last') {
                                i.editReply({ embeds: [pcommandpage1], components: [pcommandbuttons1] }).catch(err);
                            } 

                            if (i.customId === 'pcommand-first') {
                                i.editReply({ embeds: [pcommandpage], components: [pcommandbuttons] }).catch(err);
                            }

                            if (i.customId === 'pcommand-helpcenterbutton') {
                                i.editReply({ embeds: [centerembed], components: [helprow2] }).catch(err);
                            }

                            if (i.customId === 'pcommand-pageleft') { 
                                i.editReply({ embeds: [pcommandpage], components: [pcommandbuttons] }).catch(err);
                            }

                            if (i.customId === 'pcommand-pageright') { 
                                i.editReply({ embeds: [pcommandpage1], components: [pcommandbuttons1] }).catch(err);
                            }

                            if (i.customId === 'pcommand-helpcenterbutton1') {
                                i.editReply({ embeds: [centerembed], components: [helprow2] }).catch(err);
                            }

                            if (i.customId === 'pcommand-pageright1') {
                                i.editReply({ embeds: [pcommandpage1], components: [pcommandbuttons1] }).catch(err);
                            }

                            if (i.customId === 'pcommand-pageleft1') {
                                i.editReply({ embeds: [pcommandpage], components: [pcommandbuttons] }).catch(err);
                            }
                        } catch(err) {
                            console.log(`${color.red}[${getTimestamp()}]${color.reset} [PREFIX_HELP_MENU] There was an error in the buttons on prefix command help center`, err);
                        }
                    });
                }
            })
        }
}}