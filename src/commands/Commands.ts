import { Client } from "discord.js";
import Ping from "./ping"
import { Command } from "./Command";
import { DataSource } from "typeorm";
import PingCommand from "./ping";

export default function GetCommandsMap(datasource: DataSource, client: Client) : Map<string, Command> {

    let map: Map<string, Command> = new Map()

    map.set(PingCommand.commandName, new Ping(datasource, client))

    return map
}