/***
 * 
 * Exports the global singleton datasource.
 * 
 * InitializeDatasource should be called early in the script execution, to begin the Postgres connection.
 * 
 * Afterwards, the function GetDataSource() can be called by any class or object that needs a reference to the datasource.
 * 
 * 
 */


import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { Member } from "../entities/Member"
import { MemberRole } from "../entities/MemberRoles"
import { DefaultRoles1681072109943 } from "../../migrations/1681072109943-DefaultRoles"
import { RoleAssignment } from "../entities/RoleAssignments"
import { DevRole1681343382310 } from "../../migrations/1681343382310-DevRole"


/** Allows overwriting of the DataSourceOptions */
type Writeable<T> = { -readonly [P in keyof T]: T[P] };


var datasource : DataSource | undefined= undefined; 

/** Called at the beginning of the program to initialize the datasource.  */
export function InitializeDatasource(options_param: DataSourceOptions) {

    let options = options_param as Writeable<DataSourceOptions>

    options.entities = [Member, MemberRole, RoleAssignment]
    options.migrations = [DefaultRoles1681072109943, DevRole1681343382310]
    options.subscribers = []
    datasource = new DataSource(options)

}

export function IsDatasourceInitialized() {
    return datasource != undefined
}

/** Gets the global datasource singleton. */
export default function GetDatasource() : DataSource {
    return datasource!
}


