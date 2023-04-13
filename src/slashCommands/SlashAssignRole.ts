
import { SlashCommandBuilder, Interaction, CacheType, PermissionFlagsBits, ChatInputCommandInteraction, Role } from "discord.js";
import { Client } from "discord.js";
import { DataSource } from "typeorm";
import { SlashCommand } from "./SlashCommand";
import { delayDelete } from "../utility/InteractionHelpers";
import { Member } from "../entity/Member";
import { AccessLevel, MemberRole } from "../entity/MemberRoles";
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

        await interaction.reply({
            ephemeral: true,
            content: "Retrieving roles from the DB"
        })

        // Get member level

        let member_matches = await this.datasource.manager.find(Member, {
            where: {
                discord_id: interaction.user.id
            },
            relations: {
                roles_held: true
            }
        })


        // Member must exist, and dB must not be bugged (multiple members with same discord ID). Either of these conditions results in an error reply and early-function return. 
        
        if(member_matches.length < 1) {
            await interaction.editReply({
                content: "I don't have you registered. Try running the register command first."
            }).then( ()=> { delayDelete(interaction, 60000)})
            return 
        } else if(member_matches.length > 1) {
            await interaction.editReply({
                content: "Somehow too many members are registered to this discord ID. See the database administrator."
            }).then( ()=> { delayDelete(interaction, 60000)})
            return 
        }

        let member = member_matches[0]
        
        let has_authority = false;
        console.log("checking ", member.roles_held.length, "roles...")
        for(let r of member.roles_held) {
            let role_data = await this.datasource.manager.findOne(MemberRole, {
                where: {
                    role_name: r.member_role
                }
            })
            if(role_data?.access_level == AccessLevel.ADMIN || role_data?.access_level == AccessLevel.MOD) {
                has_authority = true;
                break
            }
        }

        if(!has_authority) {
            await interaction.editReply({
                content: "You don't have the authority to edit roles."
            }).then(()=>delayDelete(interaction, 60000))
            return
        }

        // first check for last discord name 

        await interaction.editReply({
            content: "You have authority to assign roles, but it hasn't yet been implemented."
        }).then( ()=>delayDelete(interaction, 60000))

        
    }
}