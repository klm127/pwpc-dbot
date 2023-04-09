import { Client } from "discord.js";
import { DataSource } from "typeorm";
import { ModalSubmit } from "./Modal";
import { ModalRegister } from "./ModalRegister";


export default function GetModalMap(datasource: DataSource, client: Client) : Map<string, ModalSubmit> {
    const map = new Map()

    map.set(ModalRegister.modalCustomId, new ModalRegister(datasource, client))

    return map
}