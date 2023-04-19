import GetDatasource from "../datasource";

import Discord from "discord.js"
import { Member } from "../entities/Member";
import { createOrEditEphReply, delayDelete60 } from "../utility/interaction";
import { AccessLevel } from "../entities/MemberRoles";

import memberRoleCache from "../cache";


/**
 * Returns a middleware that requires the interactor posess some member role.
 * 
 * Level can be a single access level that will pass the validator, or an array of access levels, any of which will pass the validator.
 * 
 * Ephemeral Messages will be sent to the user if they are unregistered or do not have the appropriate access level. The messages will be deleted after 60s.
 * 
 */
export function RequireLevel(level:AccessLevel | AccessLevel[]) : (i:Discord.Interaction)=>Promise<boolean> {
    return async (i: Discord.Interaction) => {
        const datasource = GetDatasource()
        const member = await datasource.manager.findOne(Member, {
            where: {
                discord_id: i.user.id
            },
            relations: {
                roles_held: true
            }
        })
        if(member == undefined) {
            createOrEditEphReply(i, "You need to /register first!")
            delayDelete60(i)
            return false
        }
        if(Array.isArray(level)) {
            for(let role of member.roles_held) {
                const test = memberRoleCache.get(role.member_role)
                if(test) {
                    for(let lev of level) {
                        if(test.access_level == lev) {
                            return true;
                        }
                    }
                }
            }
        } else {
            for(let role of member.roles_held) {
                const test = memberRoleCache.get(role.member_role)
                if(test) {
                    if(test.access_level == level) {
                        return true
                    }
                }
            }
        }
        createOrEditEphReply(i, "You don't have permission to use this command.")
        delayDelete60(i)
        return false
    }   
}