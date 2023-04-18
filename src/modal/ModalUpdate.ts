import { CacheType, Client, Message, ModalSubmitInteraction } from "discord.js";
import { ModalSubmit } from "./Modal";
import { DataSource } from "typeorm";
import { Member } from "../entities/Member";

import { delayDelete } from "../utility/InteractionHelpers";


export class ModalUpdate extends ModalSubmit {

    static modalCustomId = "update"

    constructor(datasource: DataSource, client: Client) {
        super(datasource, client)
    }
    async execute(i: ModalSubmitInteraction<CacheType>) {
        await i.reply({
            ephemeral: true,
            content: "Processing your update request."
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
        if(matching_id.length < 1) {
            await i.editReply({
                content: "You aren't yet registered with us. Try running /register to register."
            }).then(()=>{delayDelete(i, 60000)})
            return 
        }
        if(email.length > 0) {
            const matching_email = await this.datasource.manager.find(Member, {
                where: {
                    email: email
                }
            })
            if(matching_email.length > 0) {
                let test = matching_email[0]
                if(test.discord_id != discord_id) {
                    await i.editReply({
                        content: "A user is already using that email."
                    }).then(()=> { delayDelete(i, 6000)})
                    return
                }
            }
        }
        const member = matching_id[0]
        member.last_discord_name = discord_name
        if(email.length > 0) {
            member.email = email
        }
        if(first.length > 0) {
            member.first_name = first 
        }
        if(last.length > 0) {
            member.last_name = last 
        } 
        if(info.length > 0) {
            member.info = info
        }
        await this.datasource.manager.save(Member, member).then( ()=> {
            i.editReply({
                content: "Your info has been updated."
            }).then( ()=> {
                delayDelete(i, 60000)
            }).catch( ()=> {
                i.editReply({
                    content: "There was an issue with the database."
                }).then(()=>{
                    delayDelete(i, 60000)
                }
                )
            })
        })
    }
}