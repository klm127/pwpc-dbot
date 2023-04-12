import { Entity, Column, CreateDateColumn, OneToOne, ManyToOne, JoinTable, JoinColumn, BaseEntity  } from "typeorm"
import { MemberRole } from "./MemberRoles"
import { Member } from "./Member"

/**
 * RoleAssignment uses its two FKs, member and member_role, as its' pks as well, ensuring every role assignment to a member is unique and can only be set once. See: https://stackoverflow.com/questions/66723603/typeorm-onetoone-relation-joined-by-primary-key  for more info.
 * 
 */
@Entity()
export class RoleAssignment {

    @Column({
        primary: true
    })
    member: number

    @Column({
        primary:true
    })
    member_role: string

    @CreateDateColumn({type:"timestamptz"})
    assigned_at: Date

    /** Relations don't actually exist as columns in the table.  */
    @ManyToOne(()=>Member, (member)=>member.id)
    @JoinColumn({name:"member"})
    member_relation: Member

    @ManyToOne(()=>MemberRole, (role)=>role.role_name)
    @JoinColumn({name:"member_role"})
    role_relation: MemberRole


}