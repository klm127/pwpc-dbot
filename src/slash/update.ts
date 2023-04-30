import {
	SlashCommandBuilder,
	CacheType,
	TextInputBuilder,
	TextInputStyle,
	ActionRowBuilder,
	ModalBuilder,
	ChatInputCommandInteraction,
} from "discord.js";
import datasource from "../datasource";
import TSlashCommand from "./Slash";
import interactionIDs from "../const/interactionIDs";
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
	data: new SlashCommandBuilder().setName(interactionIDs.slash.update).setDescription("Update your user information."),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const userid = interaction.user.id;
		const matching = await datasource.member.findFirst({
			where: {
				discordId: userid,
			},
		});
		if (matching == null) {
			interaction.reply({
				fetchReply: true,
				ephemeral: true,
				content: "Sorry, I don't have a record of you.",
			});
			return;
		}

		const user = matching;

		const modal = new ModalBuilder().setCustomId(interactionIDs.modal.update).setTitle("Update your info in our database");

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
			.setPlaceholder(user.firstName)
			.setRequired(false);

		const lastNameInput = new TextInputBuilder()
			.setCustomId("last_name")
			.setLabel("Did you change your last name?")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder(user.lastName ? user.lastName : "Skywalker")
			.setRequired(false);

		const infoInput = new TextInputBuilder()
			.setCustomId("info")
			.setLabel("Would you like to change your bio?")
			.setStyle(TextInputStyle.Paragraph)
			.setPlaceholder(user.info ? user.info : "I'm a CompSci major!")
			.setRequired(false);

		const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(emailInput);

		const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(firstNameInput);

		const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(lastNameInput);

		const fourthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(infoInput);

		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

		await interaction.showModal(modal);
	},
};

export default update;
