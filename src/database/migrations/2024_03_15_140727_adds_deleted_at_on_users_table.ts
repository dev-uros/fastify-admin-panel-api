import {Kysely} from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    // Migration code
    const migration = db.schema
        .alterTable('users')
        .addColumn('deleted_at', 'timestamp')
        .compile()

    console.log({sql: migration.sql})

    await db.executeQuery(migration)
}

