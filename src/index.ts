import dotenv from "dotenv";
import { InitializeClient } from "./client";
import { Events } from "discord.js";
import dispatchInteraction from "./pick";
import { InitializeCache } from "./cache";

import datasource from "./datasource"

// Load env variables
dotenv.config();

// Ensure environment variables are present.
const expectedEnvVars = [
	"TOKEN",
	"GUILD_ID",
	"PG_IMAGE",
	"PG_CONTAINER",
	"PG_USER",
	"PG_PASS",
	"PG_DB",
	"IN_DOCKER",
	"PG_PORT_INTERNAL",
	"PG_PORT_EXPOSE",
	"TORM_SYNC",
];

let ENV_SET: boolean = true;
let missing: string[] = [];

for (let v of expectedEnvVars) {
	let check = process.env[v];
	if (check == undefined) {
		ENV_SET = false;
		missing.push(v);
	}
}

if (!ENV_SET) {
	console.error(
		"Environment variables were not all set! Ensure the .env file in the current working directory has all required environment variables. Missing: ",
		missing
	);
} else {

	// Initialize the discord client
	const client = InitializeClient({});

	// Add the interaction listener
	client.on(Events.InteractionCreate, dispatchInteraction);

	InitializeCache().then( (v)=> {
		console.log("🤖 Connecting with the discord bot.")
		client.login(process.env.TOKEN)
	})
}
