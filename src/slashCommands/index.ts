import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import ping from "./ping";

export interface TSlashCommand {
  data: SlashCommandBuilder;
  execute(interaction: ChatInputCommandInteraction<CacheType>): void;
}

const slashCommandsMap: Map<string, TSlashCommand> = new Map();

slashCommandsMap.set(ping.data.name, ping);

export default slashCommandsMap;
