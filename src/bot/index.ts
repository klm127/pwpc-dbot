import { DataSource, DataSourceOptions } from "typeorm";
import DiscordJS, { Events as DiscordEvents } from "discord.js";
import GetAppDataSource, {
  InitializeDatasource,
  IsDatasourceInitialized,
} from "../datasource";
import { SlashCommand } from "../slashCommands/SlashCommand";
import GetSlashCommandsMap from "../slashCommands/GetSlashCommandsMap";
import GetDiscordClient from "../DiscordClient";
import { ModalSubmit } from "../modal/Modal";
import GetModalMap from "../modal/GetModalMap";
import { InitializeClient, IsClientInitialized } from "./client";

export type BotParams = {
  discord: {
    token: string;
    guild_id: string;
  };
  database: DataSourceOptions;
};

/** Wraps the database connection and discord client. Calls the initializers in the database and client modules.  */
class DiscordBot {
  /** Provides access to the Postgres database. */
  database: DataSource;
  /** Provides access to Discord. */
  client: DiscordJS.Client;
  /** Commands */
  commands: Map<string, SlashCommand>;
  modals: Map<string, ModalSubmit>;

  /** Discord connection settings */
  discord_connect: BotParams["discord"];

  constructor(params: BotParams) {
    // Initialize the modules.
    if (!IsDatasourceInitialized()) {
      InitializeDatasource(params.database);
    }
    if (!IsClientInitialized()) {
      InitializeClient({});
    }

    // Get the module singletons.
    this.database = GetAppDataSource();
    this.client = GetDiscordClient();

    this.commands = GetSlashCommandsMap(this.database, this.client);
    this.modals = GetModalMap(this.database, this.client);

    this.discord_connect = params.discord;

    // Ensure *this* pointer is looking at discord bot in callbacks
    this.distributeInteraction = this.distributeInteraction.bind(this);

    this.client.on(DiscordEvents.InteractionCreate, this.distributeInteraction);
  }

  async distributeInteraction(i: DiscordJS.Interaction) {
    if (i.isChatInputCommand()) {
      const command = this.commands.get(i.commandName);
      if (command) {
        await command.execute(i);
      } else {
        await i.reply({
          content: "I don't know that command.",
        });
      }
    } else if (i.isModalSubmit()) {
      const command = this.modals.get(i.customId);
      if (command) {
        await command.execute(i);
      } else {
        await i.reply({
          ephemeral: true,
          content:
            "Your modal submission wasn't understood... how did you do that?!",
        });
      }
    }
  }

  start() {
    let my = this;
    this.database.initialize().then(async () => {
      await my.database.runMigrations().then((x) => {
        for (let m of x) {
          console.log(m.name);
        }
      });
      console.log(" >> Database initialized. Starting bot.");
      my.client.login(my.discord_connect.token);
    });
  }
}

var discordBot: DiscordBot | undefined = undefined;

export function InitializeBot(params: BotParams) {
  discordBot = new DiscordBot(params);
}

export default function GetBot(): DiscordBot {
  return discordBot!;
}
