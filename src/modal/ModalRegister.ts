import { CacheType, Client, Message, ModalSubmitInteraction } from "discord.js";
import { ModalSubmit } from "./Modal";
import { DataSource } from "typeorm";
import { Member } from "../entities/Member";

import { delayDelete } from "../utility/InteractionHelpers";


export class ModalRegister extends ModalSubmit {

    static modalCustomId = "register"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)
    }
    async execute(i: ModalSubmitInteraction<CacheType>) {
        await i.reply({
            ephemeral: true,
            content: "Processing your registration request."
        })

        const email = i.fields.getTextInputValue("email")
        const first = i.fields.getTextInputValue("first_name")
        const last = i.fields.getTextInputValue("last_name")
        const info = i.fields.getTextInputValue("info")

        const discord_id = i.user.id

        const discord_name = i.user.username

        const matching_id = await this.datasource.manager.find(Member, {
            where: {
                discord_id: discord_id
            }
        })
        if(matching_id.length > 0) {
            await i.editReply({
                content: "You have already registered an account with this discord ID."
            }).then(()=>{
                delayDelete(i, 60000)
            })
            return
        }
        const matching_email = await this.datasource.manager.find(Member, {
            where: {
                email: email
            }
        })
        if(matching_email.length > 0) {
            await i.editReply({
                content: "That email is already registered to an account."
            }).then(()=>{
                delayDelete(i, 60000)
            })
            return
        }
        let member = new Member()
        member.email = email
        member.discord_id = discord_id
        member.first_name = first
        member.last_name = last
        member.last_discord_name = discord_name
        member.info = info

        await this.datasource.manager.save(Member, member).then(async m=>{
            await i.editReply({
                content: "Saved your information to the database."
            }).then(()=>{
                delayDelete(i, 60000)
            })
        }).catch(async e=> {
            await i.editReply({
                content: "Failed to save! "
            }).then(()=>{
                delayDelete(i, 60000)
            })
        })
    }
}