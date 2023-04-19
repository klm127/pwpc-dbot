import {
	SlashCommandBuilder,
	CacheType,
	ChatInputCommandInteraction,
} from "discord.js";
import TSlashCommand from "./Slash";

const ping: TSlashCommand = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with pong."),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		await interaction.reply({
			fetchReply: true,
			content: "Pong to you " + interaction.user.username,
		});
	},
};

export default ping;
