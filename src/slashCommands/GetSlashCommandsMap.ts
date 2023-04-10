import { Client } from "discord.js";
import { SlashCommand } from "./SlashCommand";
import { DataSource } from "typeorm";
import PingCommand from "./SlashPing";
import TestMembersCommand from "./SlashTestMembers"
import SlashMessageAll from "./SlashMessageAll";
import SlashRegister from "./SlashRegister";
import SlashUpdate from "./SlashUpdate";
import SlashCreateRoles from "./SlashCreateRoles";

export default function GetSlashCommandsMap(datasource: DataSource, client: Client) : Map<string, SlashCommand> {

    let map: Map<string, SlashCommand> = new Map()

    map.set(TestMembersCommand.commandName, new TestMembersCommand(datasource, client))

    map.set(PingCommand.commandName, new PingCommand(datasource, client)) 

    map.set(SlashMessageAll.commandName, new SlashMessageAll(datasource, client))

    map.set(SlashRegister.commandName, new SlashRegister(datasource, client))

    map.set(SlashUpdate.commandName, new SlashUpdate(datasource, client))

    map.set(SlashCreateRoles.commandName, new SlashCreateRoles(datasource, client))

    return map
}