import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn  } from "typeorm"

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column({nullable: true})
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



}