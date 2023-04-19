import {
	SlashCommandBuilder,
	CacheType,
	TextInputBuilder,
	TextInputStyle,
	ActionRowBuilder,
	ModalBuilder,
	ChatInputCommandInteraction,
} from "discord.js";
import { Member } from "../entities/Member";
import GetDatasource from "../datasource";
import TSlashCommand from "./Slash";
/**
 * /update
 *
 * Provides the user with a modal populated with their current saved information.
 *
 * By editing the modal, a user may update their saved information.
 *
 * See the associated object, modal/update for how the submission is processed.
 *
 * @author klm127
 */
const update: TSlashCommand = {
	data: new SlashCommandBuilder()
		.setName("update")
		.setDescription("Update your user information."),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		let datasource = GetDatasource();
		const userid = interaction.user.id;
		const matching = await datasource.manager.find(Member, {
			where: {
				discord_id: userid,
			},
		});
		if (matching.length < 1) {
			interaction.reply({
				fetchReply: true,
				ephemeral: true,
				content: "Sorry, I don't have a record of you.",
			});
			return;
		}

		const user = matching[0];

		const modal = new ModalBuilder()
			.setCustomId("update")
			.setTitle("Update your info in our database");

		const emailInput = new TextInputBuilder()
			.setCustomId("email")
			.setLabel("Would you link to change your email?")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder(user.email)
			.setRequired(false);

		const firstNameInput = new TextInputBuilder()
			.setCustomId("first_name")
			.setLabel("Did you change your first name?")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder(user.first_name)
			.setRequired(false);

		const lastNameInput = new TextInputBuilder()
			.setCustomId("last_name")
			.setLabel("Did you change your last name?")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder(user.last_name ? user.last_name : "Skywalker")
			.setRequired(false);

		const infoInput = new TextInputBuilder()
			.setCustomId("info")
			.setLabel("Would you like to change your bio?")
			.setStyle(TextInputStyle.Paragraph)
			.setPlaceholder(user.info ? user.info : "I'm a CompSci major!")
			.setRequired(false);

		const firstActionRow =
			new ActionRowBuilder<TextInputBuilder>().addComponents(emailInput);

		const secondActionRow =
			new ActionRowBuilder<TextInputBuilder>().addComponents(
				firstNameInput
			);

		const thirdActionRow =
			new ActionRowBuilder<TextInputBuilder>().addComponents(
				lastNameInput
			);

		const fourthActionRow =
			new ActionRowBuilder<TextInputBuilder>().addComponents(infoInput);

		modal.addComponents(
			firstActionRow,
			secondActionRow,
			thirdActionRow,
			fourthActionRow
		);

		await interaction.showModal(modal);
	},
};

export default update;
