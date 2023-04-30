import { ModalSubmitInteraction, CacheType } from "discord.js";
import datasource from "../datasource";
import { delayDelete60 } from "../utility/interaction";
import { TModalCommand } from "./Modal";
import interactionIDs from "../const/interactionIDs";

/** Validates the register modal submission and updates the database accordingly. */
const register: TModalCommand = {
	modalId: interactionIDs.modal.register,
	async execute(i: ModalSubmitInteraction<CacheType>) {
		await i.reply({
			ephemeral: true,
			content: "Processing your registration request.",
		});

		const email = i.fields.getTextInputValue("email");
		const first = i.fields.getTextInputValue("first_name");
		const last = i.fields.getTextInputValue("last_name");
		const info = i.fields.getTextInputValue("info");

		const discord_id = i.user.id;

		const discord_name = i.user.username;

		const matching_id = await datasource.member.findFirst({
			where: {
				discordId: discord_id,
			},
		});
		if (matching_id != null) {
			await i
				.editReply({
					content:
						"You have already registered an account with this discord ID.",
				})
				.then(() => {
					delayDelete60(i);
				});
			return;
		}
		const matching_email = await datasource.member.findFirst({
			where: {
				email: email,
			},
		});
		if (matching_email != null && matching_email.discordId != discord_id) {
			await i
				.editReply({
					content: "That email is already registered to an account.",
				})
				.then(() => {
					delayDelete60(i);
				});
			return;
		}

		await datasource.member
			.create({
				data: {
					discordId: discord_id,
					email: email,
					firstName: first,
					lastName: last,
					lastDiscordName: discord_name,
					info: info,
				},
			})
			.then(async (m) => {
				await i
					.editReply({
						content: "Saved your information to the database.",
					})
					.then(() => {
						delayDelete60(i);
					});
			})
			.catch(async (e) => {
				await i
					.editReply({
						content: "Failed to save! ",
					})
					.then(() => {
						delayDelete60(i);
					});
			});
	},
};

export default register;
