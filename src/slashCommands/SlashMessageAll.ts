import { SlashCommandBuilder, Interaction, CacheType, PermissionFlagsBits, ChatInputCommandInteraction } from "discord.js";
import { Client } from "discord.js";
import { DataSource } from "typeorm";
import { SlashCommand } from "./SlashCommand";


export default class SlashMessageAll extends SlashCommand {
    static commandName = "messageall"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)

        this.data = new SlashCommandBuilder()
            .setName(SlashMessageAll.commandName)
            .setDescription("Messages everyone in server.")
            .addStringOption(option=>
                option.setName("message")
                .setDescription("The message to send to everyone in the server.")
                .setRequired(true)
                )
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    }
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        if(! interaction.guild) {
            await interaction.reply({
                fetchReply: true,
                content: "Can't send a message if no guild exists."
            })
            return
        }
        let msg = await interaction.options.get("message", true).value as string
        if(! msg) {
            await interaction.reply({
                fetchReply: true,
                content: "A message to send is required."
            })
            return
        }
        const mems = await interaction.guild!.members.fetch()
        if(! mems) {
            await interaction.reply({
                fetchReply: true,
                content: "No members exist to message."
            })
            return

        }
        const reply = await interaction.reply({
            fetchReply: true,
            content: "Sending.",
            ephemeral: true
        })
        for(let m of mems.values()) {
            if(!m.user.bot) {
                let dm = await m.createDM()
                dm.send({
                    content: msg
                })
            }
        }
        const reply2 = await interaction.editReply({

            content: "Sent!"
        })
        setTimeout( ()=> {
            reply.delete().then( ()=> {
            }).catch( e=> {
                console.error(e)
            })
        }, 4000)
    }
}