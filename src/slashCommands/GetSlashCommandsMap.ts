import { Client } from "discord.js";
import { SlashCommand } from "./SlashCommand";
import { DataSource } from "typeorm";
import ping from "./ping";
import TestMembersCommand from "./SlashTestMembers";
import SlashMessageAll from "./SlashMessageAll";
import SlashRegister from "./SlashRegister";
import SlashUpdate from "./SlashUpdate";
import SlashCreateRoles from "./SlashCreateRoles";
import SlashAssignRole from "./SlashAssignRole";

export default function GetSlashCommandsMap(
  datasource: DataSource,
  client: Client
): Map<string, SlashCommand> {
  let map: Map<string, SlashCommand> = new Map();

  map.set(
    TestMembersCommand.commandName,
    new TestMembersCommand(datasource, client)
  );

  map.set(ping.commandName, new ping(datasource, client));

  map.set(SlashMessageAll.commandName, new SlashMessageAll(datasource, client));

  map.set(SlashRegister.commandName, new SlashRegister(datasource, client));

  map.set(SlashUpdate.commandName, new SlashUpdate(datasource, client));

  map.set(
    SlashCreateRoles.commandName,
    new SlashCreateRoles(datasource, client)
  );

  map.set(SlashAssignRole.commandName, new SlashAssignRole(datasource, client));

  return map;
}
