import dotenv from "dotenv";
import { InitializeDatasource } from "./datasource";
import { InitializeClient } from "./client";
import { Events } from "discord.js";
import dispatchInteraction from "./pick";
import { InitializeCache } from "./cache";

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
	// Initialize the data connection
	const datasource = InitializeDatasource({
		type: "postgres",
		host:
			process.env.IN_DOCKER == "true"
				? process.env.PG_CONTAINER!
				: "localhost",
		port: parseInt(process.env.PG_PORT_EXPOSE!),
		username: process.env.PG_USER!,
		password: process.env.PG_PASS!,
		database: process.env.PG_DB!,
		synchronize: process.env.TORM_SYNC == "true" ? true : false,
		logging: false,
	});

	// Initialize the discord client
	const client = InitializeClient({});

	// Add the interaction listener
	client.on(Events.InteractionCreate, dispatchInteraction);

	// Run the client
	datasource.initialize().then(async () => {
		await datasource.runMigrations();
		await InitializeCache();
		console.log(" ⚙ Database initialized, Starting bot. ⚙ ");
		client.login(process.env.TOKEN);
	});
}
