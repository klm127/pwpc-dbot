import {
	SlashCommandBuilder,
	CacheType,
	TextInputBuilder,
	TextInputStyle,
	ActionRowBuilder,
	ModalBuilder,
	ChatInputCommandInteraction,
} from "discord.js";
import TSlashCommand from "./Slash";
import interactionIDs from "../const/interactionIDs";

const register: TSlashCommand = {
	data: new SlashCommandBuilder()
		.setName(interactionIDs.slash.register)
		.setDescription("Register as a prospective member of the programming club."),
	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const modal = new ModalBuilder().setCustomId(interactionIDs.modal.register).setTitle("Register with the Programming Club");

		const emailInput = new TextInputBuilder()
			.setCustomId("email")
			.setLabel("What's your email address?")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("myname@pennwest.edu")
			.setRequired(true);

		const firstNameInput = new TextInputBuilder()
			.setCustomId("first_name")
			.setLabel("What's your first name?")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("Luke")
			.setRequired(true);

		const lastNameInput = new TextInputBuilder()
			.setCustomId("last_name")
			.setLabel("What's your last name?")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("Skywalker")
			.setRequired(true);

		const infoInput = new TextInputBuilder()
			.setCustomId("info")
			.setLabel("Anything you'd like to add for your bio?")
			.setStyle(TextInputStyle.Paragraph)
			.setPlaceholder("I'm a CompSci major!")
			.setRequired(false);

		const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(emailInput);

		const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(firstNameInput);

		const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(lastNameInput);

		const fourthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(infoInput);

		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

		await interaction.showModal(modal);
	},
};

export default register;
