import { CacheType, ModalSubmitInteraction } from "discord.js";
import { TModalCommand } from "./Modal";
import GetDatasource from "../datasource";
import { Member } from "../entities/Member";
import { delayDelete60 } from "../utility/InteractionHelpers";

/** Validates the update modal submission and updates the database accordingly. */
const update: TModalCommand = {
	modalId: "update",
	async execute(i: ModalSubmitInteraction<CacheType>) {
		const datasource = GetDatasource();
		await i.reply({
			ephemeral: true,
			content: "Processing your update request.",
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
		if (matching_id.length < 1) {
			await i
				.editReply({
					content:
						"You aren't yet registered with us. Try running /register to register.",
				})
				.then(() => {
					delayDelete60(i);
				});
			return;
		}
		if (email.length > 0) {
			const matching_email = await datasource.manager.find(Member, {
				where: {
					email: email,
				},
			});
			if (matching_email.length > 0) {
				let test = matching_email[0];
				if (test.discord_id != discord_id) {
					await i
						.editReply({
							content: "A user is already using that email.",
						})
						.then(() => {
							delayDelete60(i);
						});
					return;
				}
			}
		}
		const member = matching_id[0];
		member.last_discord_name = discord_name;
		if (email.length > 0) {
			member.email = email;
		}
		if (first.length > 0) {
			member.first_name = first;
		}
		if (last.length > 0) {
			member.last_name = last;
		}
		if (info.length > 0) {
			member.info = info;
		}
		await datasource.manager.save(Member, member).then(() => {
			i.editReply({
				content: "Your info has been updated.",
			})
				.then(() => {
					delayDelete60(i);
				})
				.catch(() => {
					i.editReply({
						content: "There was an issue with the database.",
					}).then(() => {
						delayDelete60(i);
					});
				});
		});
	},
};

export default update;
