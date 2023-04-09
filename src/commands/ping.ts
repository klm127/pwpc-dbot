import { SlashCommandBuilder, Interaction, CacheType, Client } from "discord.js";

import { Command } from "./Command";
import { DataSource } from "typeorm";

export default class PingCommand extends Command{

    static commandName = "ping"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)

        this.data = new SlashCommandBuilder()
            .setName(PingCommand.commandName)
            .setDescription("Replies with pong.")
    }
    async execute(interaction: Interaction<CacheType>) {
        if(interaction.isChatInputCommand()) {
            await interaction.reply({
                fetchReply: true,
                content: "Pong to you " + interaction.user.username
            })
        }
    }

}
