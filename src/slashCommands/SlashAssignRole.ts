
import { SlashCommandBuilder, Interaction, CacheType, PermissionFlagsBits, ChatInputCommandInteraction, Role } from "discord.js";
import { Client } from "discord.js";
import { DataSource } from "typeorm";
import { SlashCommand } from "./SlashCommand";
import { delayDelete } from "../utility/InteractionHelpers";
import { Member } from "../entity/Member";
import { MemberRole } from "../entity/MemberRoles";
import { RoleAssignment } from "../entity/RoleAssignments";


export default class SlashAssignRole extends SlashCommand {
    static commandName = "assignrole"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)

        this.data = new SlashCommandBuilder()
            .setName(SlashAssignRole.commandName)
            .setDescription("Assigns a role to someone.")
            .addStringOption(option=>
                option.setName("target")
                .setDescription("Who should be assigned the role.")
                .setRequired(false)
                )
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
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

        // Get member level

        let member = await this.datasource.manager.find(Member, {
            where: {
                discord_id: interaction.user.id
            },
            relations: {
                roles_held: true
            }
        })

        // Member must exist, and dB must not be bugged (multiple members with same discord ID). Either of these conditions results in an error reply and early-function return. 
        
        if(member.length < 1) {
            await interaction.editReply({
                content: "I don't have you registered. Try running the register command first."
            }).then( ()=> { delayDelete(interaction, 60000)})
            return 
        } else if(member.length > 1) {
            await interaction.editReply({
                content: "Somehow too many members are registered to this discord ID. See the database administrator."
            }).then( ()=> { delayDelete(interaction, 60000)})
            return 
        }

        await interaction.editReply({
            content: "The roles you hold are: " + member[0].roles_held.join(",")
        }).then( ()=> { delayDelete(interaction, 60000)})
        
    }
}