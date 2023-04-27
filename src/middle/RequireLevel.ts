import datasource from "../datasource";

import Discord from "discord.js";
import { createOrEditEphReply, delayDelete60 } from "../utility/interaction";
import { MemberRoleAccessLevel } from "@prisma/client";

import memberRoleCache from "../cache";

/**
 * Returns a middleware that requires the interactor posess some member role.
 *
 * Level can be a single access level that will pass the validator, or an array of access levels, any of which will pass the validator.
 *
 * Ephemeral Messages will be sent to the user if they are unregistered or do not have the appropriate access level. The messages will be deleted after 60s.
 *
 */
export function RequireLevel(
	level: MemberRoleAccessLevel | MemberRoleAccessLevel[] ): (i: Discord.Interaction) => Promise<boolean> {
	return async (i: Discord.Interaction) => {
		const member = await datasource.member.findFirst({
			where: {
				discordId: i.user.id,
			},
			include: {
				roleAssignments: true,
			},
		});
		if (member == undefined) {
			createOrEditEphReply(i, "You need to /register first!");
			return false;
		}
		if (Array.isArray(level)) {
			for (let role of member.roleAssignments) {
				const test = memberRoleCache.get(role.memberRoleName);
				if (test) {
					for (let lev of level) {
						if (test.accessLevel == lev) {
							return true;
						}
					}
				}
			}
		} else {
			for (let role of member.roleAssignments) {
				const test = memberRoleCache.get(role.memberRoleName);
				if (test) {
					if (test.accessLevel == level) {
						return true;
					}
				}
			}
		}
		createOrEditEphReply(
			i,
			"You don't have permission to use this command."
		);
		return false;
	};
}
