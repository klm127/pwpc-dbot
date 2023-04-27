import { SlashCommandBuilder, CacheType, ChatInputCommandInteraction } from "discord.js";
import TSlashCommand from "./Slash";
import Middleize from "../middle";
import { delayDelete60 } from "../utility/interaction";

const ping: TSlashCommand = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Replies with pong."),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		await interaction.reply({
			fetchReply: true,
			content: "Pong to you " + interaction.user.username,
		});
	},
};

ping.execute = Middleize(ping.execute).addPostProcessor(delayDelete60)

export default ping;
