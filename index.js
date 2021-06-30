const Client = require('discord.js');
const fetch = require('node-fetch');
const bot = new Client({
    allowedMentions: { parse: [] },
    intents: new Intents(Intents.ALL)
});
bot.prefix = ".";
bot.token = token;
bot.on('ready', async () => {
    bot.application.commands.create({
        name: "button",
        description: "example for button"
    });
    const guild = bot.guilds.cache.get("the id");
    await guild.commands.create({
        name: "button-g",
        description: "example for button, but guild command"
    });
    bot.user.setActivity("stuff");
    console.log('online');
});
bot.on('message', async (msg) => {
    if (msg.author.bot) return;
    if (msg.content.toLowerCase() != '.drop-the-beat') return;
    fetch(`https://discord.com/api/v9/channels/${msg.channel.id}/messages`, {
        method: "POST",
        body: JSON.stringify({
            "content": "batan",
            "components": [{
                "type": 1,
                "components": [
                                       {
                    "type": 1, "components":[
                        {
                            type: 3,
                            custom_id: "help", //this will be the main id of the whole dropdown
                            label: "test",
                            options: [
                                {
                                    label: "help",
                                    value: "home", //this will be the id of a single value in the dropdowns
                                    default: true, //if you want one value to be seen as default
                                    description: "get the main help commands, like, category wise",
                                    emoji: { id: "781553329452220477"}
                                },
                                {
                                    label: "canva",
                                    value: "canva",
                                    default: false,
                                    description: "get all the image commands",
                                    emoji: { id: "816698525219815464" }
                                },
                                {
                                    label: "emoji",
                                    value: "emoji",
                                    default: false,
                                    description: "get the emoji commands",
                                    emoji: { id: "821670793368043540"}
                                },
                                {
                                    label: "fun",
                                    value: "fun",
                                    default: false,
                                    description: "all the fun related commands like games etc",
                                    emoji: { id: "847172125815341066"}
                                },
                                {
                                    label: "img",
                                    value: "img",
                                    default: false,
                                    description: "i forgot what this does xD",
                                    emoji: { id: "816698525416030279"}
                                },
                                {
                                    label: "slash",
                                    value: "slash",
                                    default: false,
                                    description: "all the slash commands",
                                    emoji: { id: "846414368124305468" }                                    
                                },
                                {
                                    label: "util",
                                    value: "util",
                                    default: false,
                                    description: "utilities commands, stuff man... idk",
                                    emoji: { id: "847172537833750558" }
                                }
                            ],
                            placeholder: "HELP!", //placeholder will be the default display if you have default turned off for all the values
                            min_values: 1, //minimum number of choices one can take off dropdowns
                            max_values: 1, //maximum number of choices one can take off dropdowns
                        },
                    ],
                }]
                ]
            }]
        }),
        headers: {
            "Authorization": `Bot ${bot.token}`,
            "Content-Type": "application/json"
        }
    })
});
bot.on('interaction', async (interaction) => {
    if (interaction.commandName != "button") return;
    bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            /*flags: 64*/ //for ephemeral
            data: {
                content: "buttons test",
                embeds: [],
                components: [{
                    "type": 1, "components": [
                        {
                            "type": 2, //buttons
                            "label": "batan", //the thing you want to display
                            "style": 4, //red
                            "custom_id": "the_id_you_want", //the id
                            "emoji": { //if you want emoji
                                "name": "the emoji name",
                                "id": "the emoji is"
                            }       //YES I COPY PASTED THIS FROM ABOVE
                        },
                        {
                            "type": 2, //buttons
                            "label": "link", //the thing you want to display
                            "style": 5, //url button
                            "url": "the_url",
                            "emoji": { //if you want emoji
                                "name": "the emoji name",
                                "id": "the emoji is" //don't fill the id if you want ascii
                            }
                        }
                    ]
                }]
            }
        }
    })
});
bot.on('INTERACTION_CREATE', async (int) => {
    if (int.data.component_type == 2) { //buttons
    const btn = int.data.custom_id;
    if (btn == "the_id_you_want") {
        bot.api.interactions(bt.id, bt.token).callback.post({
            data: {
                type: 7, //this will edit the original interaction, change it to type 4 if you want to send a new message and set it to flags: 64 if you only want it to be seen by the user
                data: {
                    content: "the action or the reply or something",
                    embeds: [],
                }
            }
        });
    }
    } else if(bt.data.component_type == 3){
      //same way replying to normal buttons
    }
});
bot.login(bot.token);
