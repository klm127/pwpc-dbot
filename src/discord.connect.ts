import DiscordJS, {GatewayIntentBits as Intents, Events as DiscordEvents} from 'discord.js'

import Commands from "./commands/Commands"
import GetAppDataSource from './datasource';
import { Member } from './entity/Member';
import { AppDataSource } from '../myproj/src/data-source';


export default function StartBot(inDiscord=false) {

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
    
    const DataSource = GetAppDataSource(inDiscord);
    
    
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

    
    /** RUN THE BOT */
    DataSource.initialize().then(async()=>{
        DataSource.query("SELECT NOW();").then( e=>{
            console.log(e)
        })
        const member = new Member()
        member.email = "Timber@Saw.com"
        await DataSource.manager.save(member)
        console.log("\nSAVED!")

        /*client.login(process.env.TOKEN)*/
    })
    
}


