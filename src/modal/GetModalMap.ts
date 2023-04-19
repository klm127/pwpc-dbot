import { Client } from "discord.js";
import { DataSource } from "typeorm";
import { ModalSubmit } from "./Modal";
import { ModalRegister } from "./ModalRegister";
import { ModalUpdate } from "./ModalUpdate";

export default function GetModalMap(
  datasource: DataSource,
  client: Client
): Map<string, ModalSubmit> {
  const map = new Map();

  map.set(ModalRegister.modalCustomId, new ModalRegister(datasource, client));
  map.set(ModalUpdate.modalCustomId, new ModalUpdate(datasource, client));

  return map;
}
