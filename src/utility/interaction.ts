import {
	CacheType,
	ChatInputCommandInteraction,
	ModalSubmitInteraction,
	Interaction,
	RepliableInteraction
} from "discord.js";

/** Will delete a reply on an interaction that allows one. */
export function delayDelete(
	i: Interaction,
	delay: number
) {
	if(i.isRepliable() && i.replied) {
		setTimeout(() => {
			i.deleteReply();
		}, delay);

	}
}

/** Calls deleteReply after 60 seconds. */
export function delayDelete60( i: Interaction ) {
	if(i.isRepliable() && i.replied) {
		setTimeout(() => {
			i.deleteReply();
		}, 60000);
	}
}


export function createOrEditEphReply(i: Interaction, msg:string) {
	if(i.isRepliable()) {
		let p = i;
		if(!i.replied) {
			i.reply({
				fetchReply: true,
				ephemeral: true,
				content: msg
			})
		} else {
			i.editReply({
				content: msg
			})
		}
	}
}