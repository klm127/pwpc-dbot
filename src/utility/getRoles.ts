import { Interaction } from "discord.js";
import { MemberRole } from "@prisma/client";
import datasource from "../datasource";


/** Extracts the roles associated with the member associated with the discord ID of the interacting user. If there is no associated member, it will return a 0-length array. 
 * 
 * @param i The interaction to take the discord user ID from which will be used to find the member and then their roles.
 * 
*/
async function getRoles(i:Interaction) : Promise<MemberRole[]> {
    let mem = await datasource.member.findFirst({
        where: {
            discordId: i.user.id
        },
        include: {
            roleAssignments: {
                include: {
                    memberRole: true
                }
            }
        }
    })
    let result = []
    if(mem != null) {
        for(let r of mem.roleAssignments) {
            result.push(r.memberRole)
        }
    }
    return result
}

