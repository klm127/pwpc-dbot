ORM evaluation impressions:

## Prisma

[link](https://github.com/prisma)

- 9154 commits; way more than TypeORM (5241) and MicroORM (3k)
- recommended in the issue that started this investigation as the best
- lots of example projects on their GH page

- has a [schema file](https://www.prisma.io/docs/concepts/components/prisma-schema) that defines Data sources, generators, and data model definition

Schema looks a LOT like dbdiagram's language

Example schema

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false)
  title     String   @db.VarChar(255)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

enum Role {
  USER
  ADMIN
}
```

#### Data Model

data models represent data in the underlying databases (like entities in TypeORM). EG represent a table

data models can be generated from introspecting a database

data models can also be written and then mapped to the database with Prisma Migrate

after data model is set up, you generate Prisma Client to expose CRUD and more queries for the defined models 


### installing

`npm install @prisma/client`

The client will be generated and live in node_modules/.prisma!

If data model changes, `npx prisma generate` must be called tobuild the client code

The generated client will give you commands like this:

```ts
const allUsers = await prisma.user.findMany()
```







## MicroORM

- uses decorators like TypeORM
- similar configuration to TypeORM
- uses reflect-metadata

```ts
const orm = await MikroORM.init<PostgreSqlDriver>({
  entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  dbName: 'my-db-name',
  type: 'postgresql',
});
console.log(orm.em); // access EntityManager via `em` property
```

Very similar relation decorators, eg, 
```ts
@OneToMany( ()=> Book, book => book.author)
```

Columns decorated with @Property instead of @Column

You can map directly to primary keys, which was tough to do in TypeORM

```ts
@ManyToOne(() => User, { mapToPk: true })
user: number;
```

@Formula seems powerful
@Check seems powerful/useful

Documentation for relations is much better than TypeORM but similar syntax


## Objection JS

- kind of a cool syntax, but looked very JavaScript focused. Not sure how much support for TS out of the box. Very different from the decorator entity pattern in TypeORM and MicroORM



