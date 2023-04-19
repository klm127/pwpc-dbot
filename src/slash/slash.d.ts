import {
	CacheType,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

export default interface TSlashCommand {
	data: SlashCommandBuilder;
	execute(interaction: ChatInputCommandInteraction<CacheType>): void;
}
