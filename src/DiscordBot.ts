
import {DataSource, DataSourceOptions} from "typeorm"
import DiscordJS, {Events as DiscordEvents} from "discord.js"
import GetAppDataSource from "./datasource"
import { Command } from "./commands/Command"
import GetCommandsMap from "./commands/Commands"
import GetDiscordClient from "./DiscordClient"


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
    commands: Map<string, Command>

    /** Discord connection settings */
    discord_connect: BotParams["discord"]

    constructor(params: BotParams) {
        this.database = GetAppDataSource(params.database)
        this.client = GetDiscordClient()
        this.commands = GetCommandsMap(this.database, this.client)
        this.discord_connect = params.discord
        this.SetDiscordListeners()
    }

    SetDiscordListeners() {
        let my = this

        this.client.on(DiscordEvents.InteractionCreate, async i => {
            if(!i.isChatInputCommand()) return
            const command = my.commands.get(i.commandName)
            if(command) {
                await command.execute(i)
            } else {
                await i.reply({
                    content: "I don't know that command."
                })
            }
        })

    }

    start() {
        let my = this;
        this.database.initialize().then(async()=> {
            my.client.login(my.discord_connect.token)
        })
    }

}