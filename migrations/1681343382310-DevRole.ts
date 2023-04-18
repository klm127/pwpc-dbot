import { MigrationInterface, QueryRunner } from "typeorm"
import { Member } from "../src/entities/Member"
import { RoleAssignment } from "../src/entities/RoleAssignments"



export class DevRole1681343382310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("Running DevRoles migration up!")
        let karl : Member

        let karls = await queryRunner.manager.find(Member, {
            where: {
                discord_id: "822885034368827472"
            }
        })

        if(karls.length < 1) {
            karl = new Member()
            karl.discord_id = "822885034368827472"
            karl.email = "karl@should_be_pennwest.edu"
            karl.first_name = "karl"
            karl = await queryRunner.manager.save(karl)
        } else {
            karl = karls[0]
        }

        let ra = new RoleAssignment()
        ra.member = karl.id
        ra.member_role = "Bot Dev"
    

        await queryRunner.manager.save(karl)
        await queryRunner.manager.save(ra)
    }   

    public async down(queryRunner: QueryRunner): Promise<void> {
        let karls = await queryRunner.manager.find(Member, {
            where: {
                discord_id : "822885034368827472"
            }
        })
        let ras = await queryRunner.manager.find(RoleAssignment, {
            where: {
                member: karls[0].id,
                member_role: "Bot Dev"
            }
        })
        await queryRunner.manager.delete(RoleAssignment, ras)
        await queryRunner.manager.delete(Member, karls[0])


    }

}
