import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import PingCommand from "./SlashPing";

export interface TSlashCommand  {
    data: SlashCommandBuilder
    execute(interaction: ChatInputCommandInteraction<CacheType>) : void 
}


const slashCommandsMap : Map<string, TSlashCommand> = new Map()


slashCommandsMap.set(PingCommand.data.name, PingCommand)




export default slashCommandsMap;