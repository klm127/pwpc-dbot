import { Entity, Column  } from "typeorm"

@Entity()
export class MemberRole {

    @Column({
        primary: true
    })
    role_name: string

    @Column({
        default: ""
    })
    role_description: string

    static Sample() {
        let role = new MemberRole()
        role.role_name = "test"
        role.role_description = "testing role"
        return role
    }

}