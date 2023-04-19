import {
	SlashCommandBuilder,
	Interaction,
	CacheType,
	PermissionFlagsBits,
	ChatInputCommandInteraction,
} from "discord.js";
import { delayDelete } from "../utility/interaction";
import TSlashCommand from "./Slash";
import Middleize, {Require} from "../middle";
import { AccessLevel } from "../entities/MemberRoles";



/**
 * Direct messages all users in the server.
 */
const messageAll: TSlashCommand = {
	data: new SlashCommandBuilder()
		.setName("messageall")
		.setDescription("Messages everyone in server.")
		.addStringOption((option) =>
			option
				.setName("message")
				.setDescription(
					"The message to send to everyone in the server."
				)
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		if (!interaction.guild) {
			await interaction.reply({
				fetchReply: true,
				content: "Can't send a message if no guild exists.",
			});
			return;
		}
		let msg = interaction.options.get("message", true).value as string;
		if (!msg) {
			await interaction.reply({
				fetchReply: true,
				content: "A message to send is required.",
			});
			return;
		}
		const mems = await interaction.guild!.members.fetch();
		if (!mems) {
			await interaction.reply({
				fetchReply: true,
				content: "No members exist to message.",
			});
			return;
		}
		const reply = await interaction.reply({
			fetchReply: true,
			content: "Sending.",
			ephemeral: true,
		});
		for (let m of mems.values()) {
			if (!m.user.bot) {
				let dm = await m.createDM();
				dm.send({
					content: msg,
				});
			}
		}
		const reply2 = await interaction.editReply({
			content: "Sent!",
		});

		delayDelete(interaction, 60000);
	},
};


messageAll.execute = Middleize<ChatInputCommandInteraction<CacheType>>(messageAll.execute).addValidator(Require.Level([AccessLevel.ADMIN, AccessLevel.MOD]))
export default messageAll;
