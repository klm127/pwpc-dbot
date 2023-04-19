import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import slashCommandsMap from "../src/slash";
dotenv.config();

const token = process.env.TOKEN;
const guild = process.env.GUILD_ID;
const client_id = process.env.CLIENT_ID;

if (!token || !guild || !client_id) {
	throw "commands not set!";
}

const cdata: any[] = [];

for (let k of slashCommandsMap.keys()) {
	cdata.push(slashCommandsMap.get(k)?.data.toJSON());
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${cdata.length} slash commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(client_id, guild),
			{
				body: cdata,
			}
		);
		console.log("Succesfully reloaded slash commands.");
	} catch (error) {
		console.error(error);
	}
})();
