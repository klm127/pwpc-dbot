import {
	ActionRowBuilder,
	CacheType,
	ModalBuilder,
	ModalSubmitInteraction,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import { getDatePlus } from "../utility/intervals";
import interactionIDs from "../const/interactionIDs";

const voteTitle: Record<"poll" | "members" | "officers", string> = {
	poll: "Creating a new poll for everyone.",
	members: "Creating a new vote for all members.",
	officers: "Creating a new vote for officers only.",
};

export type T_VoteSubmission = {
	type?: "members" | "poll" | "officers";
	problems_info?: string[];
	title?: string;
	desc?: string;
	aye?: string;
	nay?: string;
	problems_time?: string[];
	start?: Date;
	end?: Date;
};

namespace SlashNewVote {
	/**
	 * Gets the info Modal for a new vote. This one contains the title, description, aye description, and nay description fields.
	 */
	export function getInfoModal(submission_builder: T_VoteSubmission) {
		const modal = new ModalBuilder()
			.setCustomId(interactionIDs.modal.nopick)
			.setTitle(
				submission_builder.type != undefined ? voteTitle[submission_builder.type] : "Creating vote, type not yet set."
			);

		const title_input = new TextInputBuilder()
			.setCustomId("title")
			.setLabel("Provide a vote title.")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("A motion to allocate funds for code jam prizes")
			.setRequired(true);

		if (submission_builder.title != undefined) {
			title_input.setValue(submission_builder.title);
		}

		const description_input = new TextInputBuilder()
			.setCustomId("description")
			.setLabel("Describe what the motion is.")
			.setStyle(TextInputStyle.Paragraph)
			.setMaxLength(1000)
			.setPlaceholder("This motion is to allocate $100 towards the purchase of game jam prizes...")
			.setRequired(true);

		if (submission_builder.desc != undefined) {
			description_input.setValue(submission_builder.desc);
		}

		const aye_description = new TextInputBuilder()
			.setCustomId("aye_description")
			.setLabel("Describe what an 'aye' vote is.")
			.setStyle(TextInputStyle.Short)
			.setPlaceholder("An aye vote is a vote to allocate funds.")
			.setRequired(true)
			.setValue("Aye is a vote in favor.");

		if (submission_builder.aye != undefined) {
			aye_description.setValue(submission_builder.aye);
		}

		const nay_description = new TextInputBuilder()
			.setCustomId("nay_description")
			.setLabel("Describe what a 'nay' vote is.")
			.setPlaceholder("A nay vote is to vote to NOT allocate funds.")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setValue("Nay is a vote against.");

		if (submission_builder.nay != undefined) {
			nay_description.setValue(submission_builder.nay);
		}

		const action_row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(title_input);

		const action_row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(description_input);
		const action_row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(aye_description);
		const action_row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(nay_description);

		modal.addComponents(action_row1, action_row2, action_row3, action_row4);

		return modal;
	}

	/**
	 * Parses the info modal.
	 */
	export function parseInfoModal(i: ModalSubmitInteraction<CacheType>, sb: T_VoteSubmission) {
		sb.title = i.fields.getTextInputValue("title");
		sb.desc = i.fields.getTextInputValue("description");
		sb.aye = i.fields.getTextInputValue("aye_description");
		sb.nay = i.fields.getTextInputValue("nay_description");

		sb.problems_info = [];

		if (sb.title.length < 5) {
			sb.problems_info.push("Title not long enough.");
			sb.title = undefined;
		}

		if (sb.desc.length < 20) {
			sb.problems_info.push("Description not long enough.");
			sb.desc = undefined;
		}

		if (sb.aye.length < 10) {
			sb.problems_info.push("Your aye description isn't long enough.");
			sb.aye = undefined;
		}

		if (sb.nay.length < 10) {
			sb.problems_info.push("Your nay description isn't long enough.");
			sb.nay = undefined;
		}
	}

	/** Gets the time modal */
	export function getTimeModal(submission_builder: T_VoteSubmission) {
		const modal = new ModalBuilder()
			.setCustomId(interactionIDs.modal.nopick)
			.setTitle("Input the time the vote will start and end.");

		const starts_at = new TextInputBuilder()
			.setCustomId("startsat")
			.setLabel("When does the vote start?")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setPlaceholder("now, 15m, 1h, 05/01/2023 10:00 am...")
			.setValue("now");

		if (submission_builder.start != undefined) {
			starts_at.setValue(submission_builder.start.toISOString());
		}

		const ends_at = new TextInputBuilder()
			.setCustomId("endsat")
			.setLabel("When will the vote end?")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setValue("2h");

		if (submission_builder.end != undefined) {
			ends_at.setValue(submission_builder.end.toISOString());
		}

		const action_row5 = new ActionRowBuilder<TextInputBuilder>().addComponents(starts_at);
		const action_row6 = new ActionRowBuilder<TextInputBuilder>().addComponents(ends_at);

		modal.addComponents(action_row5, action_row6);

		return modal;
	}

	/** Parses the time modal */
	export function parseTimeModal(i: ModalSubmitInteraction<CacheType>, sb: T_VoteSubmission) {
		const start_txt = i.fields.getTextInputValue("startsat");
		const end_txt = i.fields.getTextInputValue("endsat");

		sb.problems_time = [];

		let now = new Date();

		try {
			sb.start = getDatePlus(start_txt, now);
		} catch (e) {
			sb.problems_time.push("Couldn't parse start time.");
			sb.start = undefined;
		}

		try {
			sb.end = getDatePlus(end_txt, now);
		} catch (e) {
			sb.problems_time.push("Couldn't parse end time.");
			sb.end = undefined;
		}
	}
	/** Gets the submission status string. */
	export function getSubmissionStatus(sb: T_VoteSubmission) {
		let status = "\nStatus: \n";
		let problems = "\nProblems: \n";
		if (sb.problems_info == undefined) {
			problems += "You must set the vote information. \n";
		} else if (sb.problems_info.length > 0) {
			problems += sb.problems_info.join("\n") + "\n";
		}
		if (sb.problems_time == undefined) {
			problems += "You must set the vote time. \n";
		} else if (sb.problems_time.length > 0) {
			problems += sb.problems_time.join("\n");
		}
		if (sb.type == undefined) {
			status += "You must select a type.\n";
		} else {
			status += `**Type**: ${sb.type}\n`;
		}
		if (sb.title == undefined) {
			status += "You must input a title. \n";
		} else {
			status += `**Title**: ${sb.title}\n`;
		}
		if (sb.desc == undefined) {
			status += "You must provide a description of the vote.\n";
		} else {
			status += `**Description**: *${sb.desc.length} characters.*\n`;
		}
		if (sb.aye == undefined) {
			status += "You must provide a description of an 'aye' vote.\n";
		} else {
			status += `**Aye Description**: *${sb.aye.length} characters*.\n`;
		}
		if (sb.nay == undefined) {
			status += "You must provide a description of a 'nay' vote.\n";
		} else {
			status += `**Nay Description**: *${sb.nay.length} characters*.\n`;
		}
		if (sb.start == undefined) {
			status += "You must provide a start time.\n";
		} else {
			status += `**Start Time**: ${sb.start}\n`;
		}
		if (sb.end == undefined) {
			status += "You must provide an end time.\n";
		} else {
			status += `**End time**: ${sb.end}\n`;
		}
		return status + problems;
	}

	/** Validate a vote submission by checking that no fields are undefined.  */
	export function validateVote(sb: T_VoteSubmission) {
		if (
			sb.aye != undefined &&
			sb.desc != undefined &&
			sb.end != undefined &&
			sb.nay != undefined &&
			sb.start != undefined &&
			sb.title != undefined &&
			sb.type != undefined
		) {
			return true;
		}
		return false;
	}
}

export default SlashNewVote;
