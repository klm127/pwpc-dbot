import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BaseEntity  } from "typeorm"
import { RoleAssignment } from "./RoleAssignments"

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    email: string

    @Column()
    first_name: string

    @Column({nullable: true})
    last_name: string

    @Column({type:"timestamptz", nullable: true})
    birthday: Date

    @Column({nullable: true})
    info: string

    @Column({nullable: true})
    discord_id: string

    @Column({nullable: true})
    last_discord_name: string

    @Column({
        type:"timestamptz",
        nullable: true
    })
    graduation_date: Date

    // Auto insert date with current time. 
    @CreateDateColumn({type:"timestamptz"})
    created_at: Date

    // // Sets the relation. Does not actually create a column.
    @OneToMany(
        ()=>RoleAssignment,
        (ra)=>ra.member
    ) 
    roles_held: RoleAssignment[]

}