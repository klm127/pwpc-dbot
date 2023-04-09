import "reflect-metadata"
import { DataSource } from "typeorm"
import { Member } from "./entity/Member"
import { MemberRole } from "./entity/MemberRoles"
import { RoleAssignment } from "./entity/RoleAssignments"

export default function GetAppDataSource(inDocker=false) : DataSource {
    return new DataSource({
        type: "postgres",
        host: inDocker ? process.env.PG_CONTAINER : "localhost",
        port: parseInt(process.env.PG_PORT_EXPOSE as string),
        username: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: process.env.PG_DB,
        /*! Remove this! */
        synchronize: process.env.TORM_SYNC == "true" ? true : false,
        logging: false,
        entities: [Member, MemberRole, RoleAssignment],
        migrations: [],
        subscribers: []
    })
}
