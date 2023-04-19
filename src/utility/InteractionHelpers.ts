import {
	CacheType,
	ChatInputCommandInteraction,
	ModalSubmitInteraction,
} from "discord.js";

/** Will delete a reply on an interaction that allows one. */
export function delayDelete(
	i:
		| ChatInputCommandInteraction<CacheType>
		| ModalSubmitInteraction<CacheType>,
	delay: number
) {
	setTimeout(() => {
		i.deleteReply();
	}, delay);
}

/** Calls deleteReply after 60 seconds. */
export function delayDelete60(
	i:
		| ChatInputCommandInteraction<CacheType>
		| ModalSubmitInteraction<CacheType>
) {
	setTimeout(() => {
		i.deleteReply();
	}, 60000);
}
