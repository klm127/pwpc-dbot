
/**
 * This file is used for sanity testing anything that needs to be sanity tested.
 * 
 */

import { User } from "discord.js";
import GetAppDataSource from "./datasource";
import { Member } from "./entities/Member";
import { RoleAssignment } from "./entities/RoleAssignments";

import dotenv from "dotenv"
import "reflect-metadata";


dotenv.config()

let ds = GetAppDataSource({
    type: "postgres",
    host: process.env.IN_DOCKER == "true" ? process.env.PG_CONTAINER! : "localhost",
    port: parseInt(process.env.PG_PORT_EXPOSE!),
    username: process.env.PG_USER!,
    password: process.env.PG_PASS!,
    database: process.env.PG_DB!,
    synchronize: process.env.TORM_SYNC == "true" ? true: false,
    logging: false
})

console.log("initializing")
ds.initialize().then( async ()=> {
    await ds.runMigrations()
    

    let me = await ds.manager.find(Member)

    let ra = new RoleAssignment()
    ra.member = me[0].id
    ra.member_role = "President"

    await ds.manager.save(RoleAssignment, ra)


    let u = await ds.manager.find(RoleAssignment)
    console.log(u)

    let m = await ds.manager.find(Member, {
        relations: {
            roles_held: true
        }
    })
    console.log(m)
})