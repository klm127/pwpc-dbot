import * as fs from "node:fs/promises"
import path from "node:path"
import {Client} from "pg"

/**
 * Expects these arguments:
 * 
 * 1 : schema file
 * 2 : populate file
 * 3 : host
 * 4 : port 
 * 5 : database
 * 6 : user 
 * 7 : password
 */

if(process.argv.length < 5) {
    throw "Script requires 5 arguments!\nhost, port, db, user, password"
}

let schema_file = path.join(__dirname, "schema.sql")
let populate_file = path.join(__dirname, "populate.sql")
let host = process.argv[2]
let port = parseInt(process.argv[3])
let db = process.argv[4]
let user = process.argv[5]
let password = process.argv[6]


let schema_statements : Array<string> = []

const re = /;[\s\r\n]*/gm

/* break the file into statements. */
fs.readFile(schema_file, {
    encoding: 'utf8'
}).then( rr => {
    schema_statements = rr.split(re).filter( s=> {
        return s.length > 0
    })
    console.log("\nGot ", schema_statements.length, " schema statements")
})

const client = new Client({
    user: user,
    host: host,
    database: db,
    password: password,
    port: port
})

try {
    client.connect()
    client.query('SELECT NOW()', (err, res)=> {
        console.log(err, res);
        client.end()
    })
} catch(e) {
    console.log("\nCouldn't connect to DB!")
}




