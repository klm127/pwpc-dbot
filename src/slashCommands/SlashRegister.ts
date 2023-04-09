import { SlashCommandBuilder, Interaction, CacheType, PermissionFlagsBits, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalBuilder, ChatInputCommandInteraction } from "discord.js";
import { Client } from "discord.js";
import { DataSource } from "typeorm";
import { SlashCommand } from "./SlashCommand";


export default class SlashRegister extends SlashCommand {
    static commandName = "register"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)

        this.data = new SlashCommandBuilder()
            .setName(SlashRegister.commandName)
            .setDescription("Register as a prospective member of the programming club.")
    }
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {

        const modal = new ModalBuilder()
            .setCustomId("register")
            .setTitle("Register with the Programming Club")
            
        const emailInput = new TextInputBuilder()
            .setCustomId("email")
            .setLabel("What's your email address?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("myname@pennwest.edu")
            .setRequired(true)

        const firstNameInput = new TextInputBuilder()
            .setCustomId("first_name")
            .setLabel("What's your first name?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Luke")
            .setRequired(true)

        const lastNameInput = new TextInputBuilder()
            .setCustomId("last_name")
            .setLabel("What's your last name?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Skywalker")
            .setRequired(true)

        const firstActionRow = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(emailInput)
        
        const secondActionRow = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(firstNameInput)

        const thirdActionRow = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(lastNameInput)

        
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow)

        await interaction.showModal(modal)
    }
}