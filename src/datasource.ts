import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { Member } from "./entity/Member"
import { MemberRole } from "./entity/MemberRoles"
import { DefaultRoles1681072109943 } from "../migrations/1681072109943-DefaultRoles"
import { RoleAssignment } from "./entity/RoleAssignments"


type Writeable<T> = { -readonly [P in keyof T]: T[P] };


export default function GetAppDataSource(options_param: DataSourceOptions) : DataSource {

    let options = options_param as Writeable<DataSourceOptions>

    options.entities = [Member, MemberRole, RoleAssignment]
    options.migrations = [DefaultRoles1681072109943]
    options.subscribers = []

    return new DataSource(options)
}
