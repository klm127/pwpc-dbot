/***
 * Exports the Discord client as a global singleton object.
 *
 * Any other module that needs access to the client directly can call GetClient() to retrieve it.
 */

import DiscordJS, { GatewayIntentBits as Intents } from "discord.js";

var client: DiscordJS.Client | undefined = undefined;

export function InitializeClient(options: Partial<DiscordJS.ClientOptions>) {
	let default_options: DiscordJS.ClientOptions = {
		intents: [
			Intents.Guilds,
			Intents.GuildMessages,
			Intents.DirectMessages,
			Intents.MessageContent,
			Intents.GuildMembers,
		],
	};
	Object.assign(default_options, options);

	client = new DiscordJS.Client(default_options);

	return client;
}

export function IsClientInitialized() {
	return client != undefined;
}

export default function GetClient(): DiscordJS.Client {
	return client!;
}
