
import { SlashCommandBuilder, Interaction, CacheType, PermissionFlagsBits, ChatInputCommandInteraction } from "discord.js";
import { Client } from "discord.js";
import { DataSource } from "typeorm";
import { SlashCommand } from "./SlashCommand";
import { delayDelete } from "../utility/InteractionHelpers";


export default class SlashAssignRole extends SlashCommand {
    static commandName = "assignRole"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)

        this.data = new SlashCommandBuilder()
            .setName(SlashAssignRole.commandName)
            .setDescription("Messages everyone in server.")
            .addStringOption(option=>
                option.setName("message")
                .setDescription("Directly assigns a role to a user.")
                .setRequired(true)
                )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    }
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        if( ! interaction.guild) {
            await interaction.reply({
                ephemeral: true,
                fetchReply: true,
                content: "Can't send a message if no guild exists."
            }).then( ()=> {delayDelete(interaction, 60000)})
            return 
        }
    
        
        delayDelete(interaction, 60000)
    }
}