
import { SlashCommandBuilder, Interaction, CacheType, PermissionFlagsBits, ChatInputCommandInteraction } from "discord.js";
import { Client } from "discord.js";
import { DataSource } from "typeorm";
import { SlashCommand } from "./SlashCommand";
import { delayDelete } from "../utility/InteractionHelpers";


export default class SlashCreateRoles extends SlashCommand {
    static commandName = "createroles"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)

        this.data = new SlashCommandBuilder()
            .setName(SlashCreateRoles.commandName)
            .setDescription("Creates the basic roles for the programming club.")
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    }
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {

        await interaction.reply({
            ephemeral: true,
            fetchReply: true,
            content: "Setting up guild. "
        })

        if( ! interaction.guild) {
            await interaction.editReply({
                content: "Can't send a message if no guild exists."
            }).then( ()=> {delayDelete(interaction, 60000)})
            return 
        }

        const problems : string[] = []

        const na_exists = await interaction.guild.roles.cache.some(role => role.name == "New Arrival")
        if(!na_exists) {
            problems.push("New Arrival already exists.")
        }

        //interaction.guild.roles.cache.get()


        await interaction.guild.roles.create({
            name: "New Arrival",
            permissions: ["UseApplicationCommands"]
        }).catch((e)=> {
        })


        await interaction.guild.roles.create({
            name: "Member",
            permissions: ["AddReactions", "AttachFiles", "ChangeNickname", "Connect", "CreateInstantInvite", "CreatePrivateThreads", "EmbedLinks", "CreatePublicThreads", "SendMessages", "SendMessagesInThreads", "Stream", "Speak", "ViewChannel", "EmbedLinks", "UseApplicationCommands"]
        }).catch((e)=> {
            problems.push("Issue creating Member role.")
        })
        
        await interaction.guild.roles.create({
            name: "Officer",
            permissions: ["DeafenMembers", "KickMembers", "ManageEvents", "ManageGuild", "ModerateMembers", "ManageWebhooks", "ManageNicknames", "MentionEveryone", "PrioritySpeaker", "MuteMembers"]
        }).catch((e)=> {
            problems.push("Issue creating Officer role.")
        })

        if(problems.length > 0) {
            await interaction.editReply({
                content: "Problems: " + problems.join(",")
            })
        } else {
            await interaction.editReply({
                content: "Created roles."
            })
        }
        delayDelete(interaction, 60000)
    }
}