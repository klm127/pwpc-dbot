import {
  CacheType,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
} from "discord.js";

/** Will delete a reply on an interaction that allows one. */
export function delayDelete(
  i: ChatInputCommandInteraction<CacheType> | ModalSubmitInteraction<CacheType>,
  delay: number
) {
  setTimeout(() => {
    i.deleteReply();
  }, delay);
}
