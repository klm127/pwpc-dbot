import { ModalSubmitInteraction, CacheType } from "discord.js";
import GetDatasource from "../datasource";
import { delayDelete60 } from "../utility/InteractionHelpers";
import { Member } from "../entities/Member";
import { TModalCommand } from "./Modal";

/** Validates the register modal submission and updates the database accordingly. */
const register: TModalCommand = {
	modalId: "register",
	async execute(i: ModalSubmitInteraction<CacheType>) {
		const datasource = GetDatasource();
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

		const matching_id = await datasource.manager.find(Member, {
			where: {
				discord_id: discord_id,
			},
		});
		if (matching_id.length > 0) {
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
		const matching_email = await datasource.manager.find(Member, {
			where: {
				email: email,
			},
		});
		if (matching_email.length > 0) {
			await i
				.editReply({
					content: "That email is already registered to an account.",
				})
				.then(() => {
					delayDelete60(i);
				});
			return;
		}
		let member = new Member();
		member.email = email;
		member.discord_id = discord_id;
		member.first_name = first;
		member.last_name = last;
		member.last_discord_name = discord_name;
		member.info = info;

		await datasource.manager
			.save(Member, member)
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
