import { Entity, Column, OneToMany, BaseEntity, JoinColumn } from "typeorm";
import { Member } from "./Member";
import { RoleAssignment } from "./RoleAssignments";
import { Role } from "discord.js";

/**
 * AcessLevel controls how much power a particular user is granted over a bot.
 */
export enum AccessLevel {
	/** Full access and control. For developer only. */
	ADMIN = "admin",
	/** Almost full access and control. For, e.g., officers  */
	MOD = "mod",
	/** For members, most controls granted */
	MEMBER = "member",
	/** Guest members only */
	GUEST = "guest",
}

@Entity()
export class MemberRole {
	@Column({
		primary: true,
	})
	role_name: string;

	@Column({
		default: "",
	})
	role_description: string;

	@Column({ type: "enum", default: AccessLevel.GUEST, enum: AccessLevel })
	access_level: AccessLevel;

	@OneToMany(() => RoleAssignment, (ra) => ra.role_relation)
	@JoinColumn({
		name: "member",
	})
	extant_role_assignments: RoleAssignment[];
}
