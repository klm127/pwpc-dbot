# Discord.js bot for PWPC

## Dependencies

- `node` and `npm` to run js
- npm:`typescript` for better code writing
- npm:`ts-node` to skip typescript transpilation
- npm:`dotenv` to read .env files
- npm:`pg` to connect to postgres
- npm: `typeorm` to generate types from schema and queries
- npm: `reflect-metadata` used by typeorm
- `docker` to spin up a postgres database
- `postgres` as a data store


# .Env

See developers.discord.com for the token

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