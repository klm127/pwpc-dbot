import { CacheType, ModalSubmitInteraction } from "discord.js";

export type TModalCommand = {
	modalId: string;
	execute(interaction: ModalSubmitInteraction<CacheType>);
};
