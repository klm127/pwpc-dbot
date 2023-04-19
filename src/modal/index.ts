import update from "./update";
import register from "./register";
import { TModalCommand } from "./Modal";

const modalCommandsMap: Map<string, TModalCommand> = new Map();

modalCommandsMap.set(update.modalId, update);
modalCommandsMap.set(register.modalId, register);

export default modalCommandsMap;
