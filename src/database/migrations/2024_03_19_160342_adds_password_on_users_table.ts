import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    // Migration code
    const migration = db.schema
        .alterTable('users')
        .addColumn('password', 'text', col => col.notNull())
        .compile()

        console.log({sql: migration.sql})

        await db.executeQuery(migration)
}

