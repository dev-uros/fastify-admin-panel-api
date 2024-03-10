import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
  const migration = db.schema
    .createTable('users')
    .addColumn('id', 'serial', col => col.primaryKey())
    .addColumn('first_name', 'varchar', col => col.notNull())
    .addColumn('last_name', 'varchar')
    .addColumn('email', 'varchar(50)', col => col.notNull().unique())
    .addColumn('profile_picture_path', 'varchar', col => col.notNull().unique())
    .addColumn('created_at', 'timestamp', col =>
      col.defaultTo(sql`now()`).notNull()
    )
    .compile()

  console.log({sql: migration.sql})
  await db.executeQuery(migration)
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
  const migration = db.schema.dropTable('users').compile()
  console.log({sql: migration.sql})
  await db.executeQuery(migration)
}
