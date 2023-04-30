import { CacheType, ModalSubmitInteraction } from "discord.js";
import { TModalCommand } from "./Modal";
import datasource from "../datasource";
import { delayDelete60 } from "../utility/interaction";
import Middleize from "../middle";
import interactionIDs from "../const/interactionIDs";

/** Validates the update modal submission and updates the database accordingly. */
const update: TModalCommand = {
	modalId: interactionIDs.modal.update,
	async execute(i: ModalSubmitInteraction<CacheType>) {
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

		const matching_id = await datasource.member.findFirst({
			where: {
				discordId: discord_id,
			},
		});
		if (matching_id === null) {
			await i.editReply({
				content:
					"You aren't yet registered with us. Try running /register to register.",
			});
			return;
		}
		if (email.length > 0) {
			const matching_email = await datasource.member.findFirst({
				where: {
					email: email,
				},
			});
			if (matching_email != null) {
				let test = matching_email;
				if (test.discordId != discord_id) {
					await i.editReply({
						content: "A user is already using that email.",
					});
					return;
				}
			}
		}
		const member = matching_id;
		member.lastDiscordName = discord_name;
		if (email.length > 0) {
			member.email = email;
		}
		if (first.length > 0) {
			member.firstName = first;
		}
		if (last.length > 0) {
			member.lastName = last;
		}
		if (info.length > 0) {
			member.info = info;
		}

		await datasource.member
			.update({
				where: {
					id: member.id,
				},
				data: member,
			})
			.then(async () => {
				await i.editReply({
					content: "Your info has been updated.",
				});
			})
			.catch(async () => {
				await i.editReply({
					content: "There was an issue with the database.",
				});
			});
	},
};

update.execute = Middleize(update.execute).addPostProcessor(delayDelete60)

export default update;
