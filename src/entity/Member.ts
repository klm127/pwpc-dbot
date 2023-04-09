import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn  } from "typeorm"

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

    @CreateDateColumn({type:"timestamptz"})
    created_at: Date

    static Sample() {
        let mem = new Member()
        mem.email = "em@em.com"
        mem.first_name = "sample"
        return mem
    }

}