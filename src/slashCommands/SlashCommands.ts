import { Client } from "discord.js";
import { SlashCommand } from "./SlashCommand";
import { DataSource } from "typeorm";
import PingCommand from "./SlashPing";
import TestMembersCommand from "./SlashTestMembers"

export default function GetSlashCommandsMap(datasource: DataSource, client: Client) : Map<string, SlashCommand> {

    let map: Map<string, SlashCommand> = new Map()

    map.set(TestMembersCommand.commandName, new TestMembersCommand(datasource, client))
    map.set(PingCommand.commandName, new PingCommand(datasource, client))

    return map
}