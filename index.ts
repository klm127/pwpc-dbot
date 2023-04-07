import DiscordJS, {GatewayIntentBits as Intents, Events as DiscordEvents} from 'discord.js'
import dotenv from 'dotenv'

import Commands from "./commands/Commands"

dotenv.config()

const GUILD_ID = process.env.GUILD_ID as string
var guild : DiscordJS.Guild | undefined;

const client = new DiscordJS.Client({
    intents: [
        Intents.Guilds,
        Intents.GuildMessages,
        Intents.DirectMessages,
        Intents.MessageContent,
        Intents.GuildMembers
    ],
})




client.on(DiscordEvents.MessageCreate, m => {
    
    if(m.content == "ping") {
        m.reply({
            content: "pong to you, " + m.author
        })
    }
})

client.on(DiscordEvents.InteractionCreate, async i=>{
    if(!i.isChatInputCommand()) return
    const command = Commands.get(i.commandName)
    if(command) {
        await command.execute(i);
    } else {
        await i.reply({
            content: "I don't know that command."
        })
    }

})



client.login(process.env.TOKEN)