import { DataSource } from "typeorm"
import { CacheType, Client, Interaction, SlashCommandBuilder } from "discord.js"


/**
 * "Abstract" class for commands that provides access to datasource and client.
 */
export class Command {
    datasource: DataSource
    client: Client
    data: SlashCommandBuilder

    constructor(datasource: DataSource, client: Client) {
        this.datasource = datasource
        this.client = client
    }

    async execute(interaction: Interaction<CacheType>) {}
    
}