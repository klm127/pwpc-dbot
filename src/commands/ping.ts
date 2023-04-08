import { SlashCommandBuilder, Interaction, CacheType } from "discord.js";


export default {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Replies with pong."),
    async execute(interaction: Interaction<CacheType>) {
        if(interaction.isChatInputCommand()) {
            await interaction.reply({
                fetchReply: true,
                content: "Pong to you " + interaction.user.username + "!"
            })
        }
    }
}