import { CacheType, Client, Interaction, ModalSubmitInteraction } from "discord.js"
import { DataSource } from "typeorm"


export class ModalSubmit {
    datasource: DataSource
    client: Client

    constructor(datasource: DataSource, client: Client) {
        this.datasource = datasource
        this.client = client
    }

    async execute(interaction: ModalSubmitInteraction<CacheType>) {


    }
    
}