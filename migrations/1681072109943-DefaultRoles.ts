import { MigrationInterface, QueryRunner } from "typeorm"
import { MemberRole } from "../src/entity/MemberRoles"

export class DefaultRoles1681072109943 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const president = new MemberRole()
        president.role_name = "President"
        president.role_description = "- Has overall responsibility of the club. \n - Organizes member meetings and activities that occur throughout the year. \n - Calls and presides at all regular and special meetings."
        const vice_president = new MemberRole()
        vice_president.role_name = "Vice President"
        vice_president.role_description = "- Performs the duties of the president in his/her absence, inability to serve, or at his/her call.\n- Assists president in coordinating member meetings and activities.\n- Shares joint responsibility with the secretary for social media & communication."
        const secretary = new MemberRole()
        secretary.role_name = "Secretary"
        secretary.role_description = "- Keeps a record of all attending members and their activity status. \n- Keeps full minutes of every meeting. \n- Shares joint responsibility with the Vice President for social media & communication."
        const treasurer = new MemberRole()
        treasurer.role_name = "Treasurer"
        treasurer.role_description = "- Is responsible for the supervision of the clubs financing. \n- Is responsible for coordinating the preparation of the annual budget packet."
        const member = new MemberRole()
        member.role_name = "Member"
        member.role_description = "- A club member; a student who has completed the membership requirements.\n - Counts towards quorum. \n- Participates in member-wide votes."
        const officer = new MemberRole()
        officer.role_name = "Officer"
        officer.role_description = "- An officer; on the board of directors. \n- Participates in certain officer-only votes."
        const prospective_member = new MemberRole()
        prospective_member.role_name = "Prospective Member"
        prospective_member.role_description = "- A student who is not yet a member."
        const guest = new MemberRole()
        guest.role_name = "Guest"
        guest.role_description = "- A non-member who is not joining the club."
        const alumni = new MemberRole()
        alumni.role_name = "Alumni"
        alumni.role_description = "- One who was previously a member of the club, but graduated or otherwise left."
        await queryRunner.manager.save(MemberRole, [president, vice_president, secretary, treasurer, member, officer, prospective_member, guest, alumni])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
        queryRunner.manager.delete(MemberRole, [president, vice_president, secretary, treasurer, member, officer, guest, alumni])
    }

}
