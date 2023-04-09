import { SlashCommandBuilder, Interaction, CacheType, Client } from "discord.js";

import { SlashCommand } from "./SlashCommand";
import { DataSource } from "typeorm";

import { Member } from "../entity/Member";

export default class TestMembersCommand extends SlashCommand {

    static commandName = "members"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)

        this.data = new SlashCommandBuilder()
            .setName(TestMembersCommand.commandName)
            .setDescription("Lists the officers.")
    }
    async execute(interaction: Interaction<CacheType>) {
        if(interaction.isChatInputCommand()) {


            const users = await this.datasource.getRepository(Member).find()
            await interaction.reply({
                fetchReply: true,
                content: JSON.stringify(users)
            })
        }
    }

}
