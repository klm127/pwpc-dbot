import DiscordJS, {GatewayIntentBits as Intents, Events as DiscordEvents} from 'discord.js'

export default function GetDiscordClient() {

    const client = new DiscordJS.Client({
        intents: [
            Intents.Guilds,
            Intents.GuildMessages,
            Intents.DirectMessages,
            Intents.MessageContent,
            Intents.GuildMembers
        ]
    })

    return client

}