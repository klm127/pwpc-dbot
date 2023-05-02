# Discord.js bot for PWPC

This bot will register users and let them update their profile. It will also be able to take votes. 

## Dependencies

-   `node` and `npm` to run js
-   npm:`typescript` for better code writing
-   npm:`ts-node` to skip typescript transpilation
-   npm:`dotenv` to read .env files
-   npm:`pg` to connect to postgres
-   npm: `prisma` to interact with the database. [LINK](https://www.prisma.io)
-   npm: `reflect-metadata` used by typeorm
-   `docker` to spin up a postgres database
-   `make` to build and run the database image. You can get make on Windows with `choco install make` [Chocolatey](https://chocolatey.org/)
-   `postgres` as a data store

# .Env

Environment variables need to be set to run the bot. This means creating a file in the root of the repository. The .env file is not uploaded to github and must be manually created.

See developers.discord.com for the token

Here's an example .env file.

```
TOKEN= private

GUILD_ID=1093204439025864744

CLIENT_ID=1093203377292329020

# ---- Postgres Database Config ---

PG_IMAGE=postgres:15.2-alpine
PG_CONTAINER=pg-dbot48

PG_USER=cabot
PG_PASS=aR3allyC00lA3ndL0ngP2w!
PG_DB=dbot
PG_PORT_INTERNAL=5432
PG_PORT_EXPOSE=5430

IN_DOCKER=false

# ---- TypeORM config

TORM_SYNC=true
```

## Running

- Add the .env file to the root directory of the file and populate it with the appropriate values. The most important is Token, which you need to get yourself from developer.discord.com
- Install Docker
- Install Make (for creating the docker dbs)
- Run `make pg` to create and run the container
- Run `npm i` to install dependencies
- Run `npx prisma migrate` to load the database schema
- Run `npx prisma generate` to generate the prisma code in `node_modules/.prisma` code
- Run `npm run dev` to run the dev script with ts-node to start the bot

## Developing

See the [Discord docs](https://old.discordjs.dev/#/docs/discord.js/14.9.0/general/welcome)



