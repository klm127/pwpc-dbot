
import {DataSource, DataSourceOptions} from "typeorm"
import DiscordJS, {Events as DiscordEvents} from "discord.js"
import GetAppDataSource from "./datasource"
import { SlashCommand } from "./slashCommands/SlashCommand"
import GetSlashCommandsMap from "./slashCommands/GetSlashCommandsMap"
import GetDiscordClient from "./DiscordClient"
import { ModalSubmit } from "./modal/Modal"
import GetModalMap from "./modal/GetModalMap"


export type BotParams = {
    discord: {
        token: string,
        guild_id: string
    },
    database: DataSourceOptions
}

/** Wraps the database connection and discord client. */
export default class DiscordBot {

    /** Provides access to the Postgres database. */
    database: DataSource
    /** Provides access to Discord. */
    client: DiscordJS.Client
    /** Commands */
    commands: Map<string, SlashCommand>
    modals: Map<string, ModalSubmit>

    /** Discord connection settings */
    discord_connect: BotParams["discord"]

    constructor(params: BotParams) {
        this.database = GetAppDataSource(params.database)
        this.client = GetDiscordClient()
        this.commands = GetSlashCommandsMap(this.database, this.client)
        this.modals = GetModalMap(this.database, this.client)
        this.discord_connect = params.discord
        this.setDiscordListeners();
        //console.log("commands loaded:", Array.from(this.commands.keys()).join(","))
        let g = this.client.guilds.resolveId(this.discord_connect.guild_id)
        let f = this.client.guilds.resolve(this.discord_connect.guild_id)
        this.setGuildRoles();

    }

    setDiscordListeners() {
        let my = this

        this.client.on(DiscordEvents.InteractionCreate, async i => {
            if(i.isChatInputCommand()) {
                const command = my.commands.get(i.commandName)
                if(command) {
                    await command.execute(i)
                } else {
                    await i.reply({
                        content: "I don't know that command."
                    })
                }
            } else if(i.isModalSubmit()) {
                const command = my.modals.get(i.customId)
                if(command) {
                    await command.execute(i)
                } else {
                    await i.reply({
                        ephemeral: true,
                        content: "Your modal submission wasn't understood... how did you do that?!"
                    })
                }
            }
            
        })

    }

    setGuildRoles() {
        let my = this
        this.client.on(DiscordEvents.GuildMemberAdd, async m => {
            const dm = await m.createDM(true)
            await dm.send({
                content: "Welcome to the bot testing server. Try me out in the server with slash commands. " + m.user.username
            })
            setTimeout( async ()=> {
                await dm.delete()
            }, 60000)
        })
    }

    start() {
        let my = this;
        this.database.initialize().then(async()=> {
            await my.database.runMigrations().then( (x)=> {
                for(let m of x) {
                    console.log(m.name)
                }
            })
            console.log(" >> Database initialized. Starting bot.")
            my.client.login(my.discord_connect.token)
        })
    }

}