import { SlashCommandBuilder, CacheType, Client, ChatInputCommandInteraction } from "discord.js";

import { SlashCommand } from "./SlashCommand";
import { DataSource } from "typeorm";

export default class PingCommand extends SlashCommand {

    static commandName = "ping"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)

        this.data = new SlashCommandBuilder()
            .setName(PingCommand.commandName)
            .setDescription("Replies with pong.")
    }
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        await interaction.reply({
            fetchReply: true,
            content: "Pong to you " + interaction.user.username
        })
    }

}
