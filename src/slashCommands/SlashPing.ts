import { SlashCommandBuilder, CacheType, Client, ChatInputCommandInteraction } from "discord.js";

import { SlashCommand } from "./SlashCommand";
import { DataSource } from "typeorm";
import { TSlashCommand } from ".";


const PingCommand : TSlashCommand = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with pong."),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        await interaction.reply({
            fetchReply: true,
            content: "Pong to you " + interaction.user.username
        })
    }
}


export default PingCommand