import TSlashCommand from "./Slash";
import ping from "./ping";
import register from "./register";
import update from "./update";
import messageAll from "./messageAll";
import boolvote from "./newvote";

const slashCommandsMap: Map<string, TSlashCommand> = new Map();

slashCommandsMap.set(ping.data.name, ping);
slashCommandsMap.set(register.data.name, register);
slashCommandsMap.set(update.data.name, update);
slashCommandsMap.set(messageAll.data.name, messageAll);
slashCommandsMap.set(boolvote.data.name, boolvote)

export default slashCommandsMap;
