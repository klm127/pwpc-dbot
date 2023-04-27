# Notes on prisma

### migrating

- `--from-empty`: assumes the data model you're migrating from is empty
- `--to-schema-datamodel`: the current database state using the URL in the datasource block
- `--script`: output a SQL script

```
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
```

```
npx prisma migrate resolve --applied 0_init
```

[more info on migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate/mental-model)


Push changes to schema and generate a migration
```
prisma dev
```

Push changes with no migration
```
prisma db push
```

When you change the schema, you may have to run

```
prisma generate
```

That will create a new type in `node_modules/.prisma`. Note that you may need to reload VSCode to get your intellisense correct.
