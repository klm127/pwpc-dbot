import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";
import ping from "./ping"

let map = new Map<string,{
    data: SlashCommandBuilder,
    execute: (interaction: Interaction<CacheType>) => void
}>();

map.set("ping", ping)

export default map