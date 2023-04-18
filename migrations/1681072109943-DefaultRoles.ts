import { MigrationInterface, QueryRunner } from "typeorm"
import { AccessLevel, MemberRole } from "../src/entities/MemberRoles"

export class DefaultRoles1681072109943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Running DefaultRoles migration up!")

        const dbDev = new MemberRole()
        dbDev.role_name = "Bot Dev"
        dbDev.role_description = "- Is responsible for maintaining and working on the bot. Has max access levels but may not hold official club positions."
        dbDev.access_level = AccessLevel.ADMIN

        const president = new MemberRole()
        president.role_name = "President"
        president.role_description = "- Has overall responsibility of the club. \n - Organizes member meetings and activities that occur throughout the year. \n - Calls and presides at all regular and special meetings."
        president.access_level = AccessLevel.ADMIN

        const vice_president = new MemberRole()
        vice_president.role_name = "Vice President"
        vice_president.role_description = "- Performs the duties of the president in his/her absence, inability to serve, or at his/her call.\n- Assists president in coordinating member meetings and activities.\n- Shares joint responsibility with the secretary for social media & communication."
        vice_president.access_level = AccessLevel.ADMIN

        const secretary = new MemberRole()
        secretary.role_name = "Secretary"
        secretary.role_description = "- Keeps a record of all attending members and their activity status. \n- Keeps full minutes of every meeting. \n- Shares joint responsibility with the Vice President for social media & communication."
        secretary.access_level = AccessLevel.MOD

        const treasurer = new MemberRole()
        treasurer.role_name = "Treasurer"
        treasurer.role_description = "- Is responsible for the supervision of the clubs financing. \n- Is responsible for coordinating the preparation of the annual budget packet."
        treasurer.access_level = AccessLevel.MOD

        const member = new MemberRole()
        member.role_name = "Member"
        member.role_description = "- A club member; a student who has completed the membership requirements.\n - Counts towards quorum. \n- Participates in member-wide votes."
        member.access_level = AccessLevel.MEMBER

        const officer = new MemberRole()
        officer.role_name = "Officer"
        officer.role_description = "- An officer; on the board of directors. \n- Participates in certain officer-only votes."
        officer.access_level = AccessLevel.MOD

        const prospective_member = new MemberRole()
        prospective_member.role_name = "Prospective Member"
        prospective_member.role_description = "- A student who is not yet a member."
        prospective_member.access_level = AccessLevel.GUEST

        const guest = new MemberRole()
        guest.role_name = "Guest"
        guest.role_description = "- A non-member who is not joining the club."
        guest.access_level = AccessLevel.GUEST

        const alumni = new MemberRole()
        alumni.role_name = "Alumni"
        alumni.role_description = "- One who was previously a member of the club, but graduated or otherwise left."
        alumni.access_level = AccessLevel.GUEST

        await queryRunner.manager.save(MemberRole, [dbDev, president, vice_president, secretary, treasurer, member, officer, prospective_member, guest, alumni])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const dbDev = new MemberRole()
        dbDev.role_name = "Bot Dev"
        const president = new MemberRole()
        president.role_name = "President"
        const vice_president = new MemberRole()
        vice_president.role_name = "Vice President"
        const secretary = new MemberRole()
        secretary.role_name = "Secretary"
        const treasurer = new MemberRole()
        treasurer.role_name = "Treasurer"
        const member = new MemberRole()
        member.role_name = "Member"
        const officer = new MemberRole()
        officer.role_name = "Officer"
        const guest = new MemberRole()
        guest.role_name = "Guest"
        const alumni = new MemberRole()
        alumni.role_name = "Alumni"
        queryRunner.manager.delete(MemberRole, [dbDev, president, vice_president, secretary, treasurer, member, officer, guest, alumni])
    }

}
