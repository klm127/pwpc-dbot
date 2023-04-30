/**
 * Picks the actual command function to call based on the type and name of the interaction.
 */

import slashMap from "./slash";
import modalMap from "./modal";
import Discord, { Client, Events } from "discord.js";
import interactionIDs from "./const/interactionIDs";

export default async function dispatchInteraction(i: Discord.Interaction) {
	if (i.isChatInputCommand()) {
		const command = slashMap.get(i.commandName);
		if (command) {
			await command.execute(i);
		} else {
			await i.reply({
				content: "I don't know that command.",
				ephemeral: true,
			});
		}
	} else if (i.isModalSubmit()) {
		if(i.customId != interactionIDs.modal.nopick) {
			const command = modalMap.get(i.customId);
			if (command) {
				await command.execute(i);
			} else {
				await i.reply({
					content: "I don't recognize that modal. How did you do that?",
					ephemeral: true,
				});
			}
		}
	}
}
