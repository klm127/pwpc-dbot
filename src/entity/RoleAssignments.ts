import { Entity, Column, CreateDateColumn, OneToOne  } from "typeorm"
import { MemberRole } from "./MemberRoles"
import { Member } from "./Member"

@Entity()
export class RoleAssignment {

    @OneToOne(()=>Member)
    @Column({
        primary: true
    })
    member: number

    @OneToOne(()=> MemberRole)
    @Column({
        primary: true
    })
    member_role: string

    @CreateDateColumn({type:"timestamptz"})
    assigned_at: Date


}