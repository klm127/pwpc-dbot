import { Member } from "@prisma/client";
import { CacheType, ChatInputCommandInteraction, RepliableInteraction } from "discord.js";
import datasource from "../datasource";
import { createOrEditEphReply } from "./interaction";


/**
 * Gets a Member from the database based on the unique discordID of the interacting user. If no member is found, an ephemeral errmsg reply is created or edited. Returns null if no member was found, otherwise returns the member.
 * @param interaction A repliable interaction.
 * @param errmsg A string to use as the error message if no member is found.
 */
export async function getMemberOrErrReply(interaction: RepliableInteraction, errmsg: string) : Promise<Member | null> {
    let mem = await datasource.member.findFirst({
        where: {
            discordId: interaction.user.id
        }
    })
    if(mem == null) {
        if(interaction.replied) {
            await interaction.editReply({
                content: errmsg,
            })
        } else {
            await interaction.reply({
                content: errmsg,
                ephemeral: true
            })

        }
    }
    return mem   
}

/**
 * Validates that a slash command has the given string option and that the option passed is one of the accepted values.
 * @param ptname The option name.
 * @param testAgainst The valid options.
 * @returns null if invalid, otherwise the extracted string option value.
 */
export async function getRequiredOptionOrErrReply(interaction: ChatInputCommandInteraction<CacheType>, ptname: string, testAgainst: string[]) {
    let passed_value = interaction.options.get("type", true).value
    if(!passed_value) {
        createOrEditEphReply(interaction, `${ptname} is required. Valid values are ${testAgainst.join(",")}.`)
        return null
    }
    if(typeof passed_value != "string") {
        createOrEditEphReply(interaction, `${ptname} is required. Valid values are ${testAgainst.join(", ")}.`)
        return null
    }
    let found = false
    for(let f of testAgainst) {
        if(passed_value == f) {
            found = true;
            break;
        }
    }
    if(!found) {
        createOrEditEphReply(interaction, `${passed_value} is not valid for ${ptname}. Valid values are ${testAgainst.join(", ")}.`)
        return null
    }
    return passed_value
}