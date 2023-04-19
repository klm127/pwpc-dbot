import {
	CacheType,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";
import TSlashCommand from "./Slash";
import ping from "./ping";
import register from "./register";
import update from "./update";
import messageAll from "./messageAll";

const slashCommandsMap: Map<string, TSlashCommand> = new Map();

slashCommandsMap.set(ping.data.name, ping);
slashCommandsMap.set(register.data.name, register);
slashCommandsMap.set(update.data.name, update);
slashCommandsMap.set(messageAll.data.name, messageAll);

export default slashCommandsMap;
