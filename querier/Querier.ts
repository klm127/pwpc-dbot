import {Client as PgClient } from "pg"

/**
 * Connects to the postgres database instance and performs queries.
 */
class PostgresClient {
    postgres: PgClient
    constructor(user:string, host:string, database:string, password:string, port:string|number) {
        this.postgres = new PgClient({
            user: user,
            host: host,
            database: database,
            password: password,
            port: typeof(port) === "string" ? parseInt(port) : port
        })
    }
}