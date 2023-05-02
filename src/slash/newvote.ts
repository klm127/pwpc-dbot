import {
	ButtonStyle,
	CacheType,
	ChatInputCommandInteraction,
	ComponentType,
	SlashCommandBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import TSlashCommand from "./Slash";
import interactionIDs from "../const/interactionIDs";
import { delayDelete60, delayDelete60IR } from "../utility/interaction";
import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import SlashNewVote, { T_VoteSubmission } from "./newvote.helpers";
import { getRoles } from "../utility/getRoles";

const boolvote: TSlashCommand = {
	data: new SlashCommandBuilder().setName(interactionIDs.slash.newVote).setDescription("Starts an aye/nay vote or poll."),

	async execute(interaction: ChatInputCommandInteraction<CacheType>) {
		const setVoteType = new StringSelectMenuBuilder()
			.setPlaceholder("Select the vote type.")
			.setCustomId(interactionIDs.selects.newvote.type)
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel("poll")
					.setDescription("Anyone on the server can vote in this.")
					.setValue("poll"),
				new StringSelectMenuOptionBuilder()
					.setLabel("members")
					.setDescription("Only registered members may vote.")
					.setValue("members"),
				new StringSelectMenuOptionBuilder()
					.setLabel("officers")
					.setDescription("Only officers may vote.")
					.setValue("officers")
			);

		const setVoteInfo = new ButtonBuilder()
			.setCustomId(interactionIDs.buttons.newvote.info)
			.setLabel("Set Vote Info")
			.setStyle(ButtonStyle.Secondary);

		const setVoteTime = new ButtonBuilder()
			.setCustomId(interactionIDs.buttons.newvote.time)
			.setLabel("Set Vote Time")
			.setStyle(ButtonStyle.Secondary);

		const submit = new ButtonBuilder()
			.setCustomId(interactionIDs.buttons.newvote.submit)
			.setLabel("Create Vote")
			.setStyle(ButtonStyle.Primary);

		const cancel = new ButtonBuilder()
			.setCustomId(interactionIDs.buttons.newvote.cancel)
			.setLabel("Cancel Vote")
			.setStyle(ButtonStyle.Danger);

		const row1 = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(setVoteType);

		const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(setVoteInfo);
		const row3 = new ActionRowBuilder<ButtonBuilder>().addComponents(setVoteTime);
		const row4 = new ActionRowBuilder<ButtonBuilder>().addComponents(submit);
		const row5 = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel);

		let finished = false;

		let submission: T_VoteSubmission = {};

		let interactors_roles = await getRoles(interaction);

		const response = await interaction.reply({
			content: SlashNewVote.getSubmissionStatus(submission),
			ephemeral: true,
			components: [row1, row2, row3, row4, row5],
		});

		while (!finished) {
			const click_or_select = await response
				.awaitMessageComponent<ComponentType.Button | ComponentType.StringSelect>({
					time: 500000,
					dispose: true,
				})
				.catch((e) => {
					response.edit({
						content: "You took too long to create this vote.",
						components: [],
					});
				});
			if (!click_or_select) break;

			if (click_or_select.isButton()) {
				if (click_or_select.customId === interactionIDs.buttons.newvote.info) {
					await click_or_select.showModal(SlashNewVote.getInfoModal(submission));
					let sub = await click_or_select
						.awaitModalSubmit({
							time: 500000,
						})
						.catch((e) => {
							submission.problems_info?.push("You took too long to submit.");
						});
					if (sub) {
						SlashNewVote.parseInfoModal(sub, submission);
						sub.reply({
							ephemeral: true,
							content: "Got your info submission.",
						});
						sub.deleteReply();
					}
					await response.edit({
						content: SlashNewVote.getSubmissionStatus(submission),
					});
				} else if (click_or_select.customId === interactionIDs.buttons.newvote.time) {
					await click_or_select.showModal(SlashNewVote.getTimeModal(submission));
					let sub = await click_or_select
						.awaitModalSubmit({
							time: 50000,
						})
						.catch((e) => {
							submission.problems_time?.push("You took to long to submit.");
						});

					if (sub) {
						SlashNewVote.parseTimeModal(sub, submission);
						sub.reply({
							ephemeral: true,
							content: "Got your time submission.",
						});
						sub.deleteReply();
					}
					await response.edit({
						content: SlashNewVote.getSubmissionStatus(submission),
					});
				} else if (click_or_select.customId === interactionIDs.buttons.newvote.submit) {
					await click_or_select.update({
						content: "Attempting to submit.",
					});
				} else if (click_or_select.customId === interactionIDs.buttons.newvote.cancel) {
					await click_or_select.update({
						content: "Vote creation canceled.",
						components: [],
					});
					finished = true;
				}
			} else {
				let value = click_or_select.values[0];
				if (value == "members" || value == "officers" || value == "poll") {
					let has_authority = false;
					if (value == "members" || value == "officers") {
						for (let r of interactors_roles) {
							if (r.accessLevel == "mod" || r.accessLevel == "admin") {
								has_authority = true;
								break;
							}
						}
						if (has_authority) {
							submission.type = value;
						} else {
							submission.type = undefined;
							if (!submission.problems_info) submission.problems_info = [];
							submission.problems_info.push(`You do not have the authority to create ${value} votes.`);
						}
					} else {
						submission.type = value;
					}
				}
				await click_or_select.update({
					content: SlashNewVote.getSubmissionStatus(submission),
				});
			}
		}
		await delayDelete60IR(response);
	},
};

export default boolvote;
