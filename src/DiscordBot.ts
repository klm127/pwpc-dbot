
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
        this.setDiscordListeners()
        //console.log("commands loaded:", Array.from(this.commands.keys()).join(","))
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

    start() {
        let my = this;
        this.database.initialize().then(async()=> {
            console.log(" >> Database initialized. Starting bot.")
            my.client.login(my.discord_connect.token)
        })
    }

}