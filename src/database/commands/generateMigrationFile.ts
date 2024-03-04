import {promises as fsPromises, existsSync} from 'fs';
import * as path from 'path';
import moment from 'moment';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
import yargs from 'yargs';

const timestamp = moment().format('YYYY_MM_DD_HHmmss');

const y = yargs();
const argv = y
    .option('t', {
        alias: 'table',
        describe: 'Table name',
        demandOption: true,
        type: 'string'
    })
    .option('f', {
        alias: 'file',
        describe: 'Migration file name',
        demandOption: true,
        type: 'string'
    }).option('m', {
        alias: 'mode',
        describe: 'Migration mode (c for create table, e for edit table)',
        demandOption: true,
        choices: ['c', 'e']
    })
    .parse(process.argv.slice(2)) as unknown as { file: string, table: string, mode: string };


const options = {
    migrationName: argv.file,
    tableName: argv.table,
    mode: argv.mode
};

function generateMigrationFile(options: { migrationName: string, tableName: string, mode: string }) {
    if (options.mode === 'c') {
        return `\
import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    // Migration code
    await db.schema
        .createTable('${options.tableName}')
            .addColumn('id', 'serial', (col) => col.primaryKey())
            .addColumn('first_name', 'varchar', (col) => col.notNull())
            .addColumn('last_name', 'varchar')
            .addColumn('email', 'varchar(50)', (col) => col.notNull().unique())
            .addColumn('profile_picture_path', 'varchar', (col) => col.notNull().unique())
            .addColumn('created_at', 'timestamp', (col) =>
                col.defaultTo(sql\`now()\`).notNull()
            )
       
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    // Migration code
    await db.schema.dropTable('${options.tableName}').execute();
}
`;
    } else {
        return `\
import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    // Migration code
    await db.schema
        .alterTable('${options.tableName}')    
        .alterColumn('some_column', (ac) => ac.setDataType('varchar(255)'))
        .execute()   
}

`;
    }

}

async function createMigrationFile(options: { mode: string, migrationName: string, tableName: string }) {
    const migrationsFolder = path.join(__dirname,'..','..','..','src','database', 'migrations');

    try {
        if (!existsSync(migrationsFolder)) {
            await fsPromises.mkdir(migrationsFolder, {recursive: true}); // Create the folder if it doesn't exist
        }
        const migrationFileName = `${timestamp}_${options.migrationName}.ts`;
        const filePath = path.join(migrationsFolder, migrationFileName);

        await fsPromises.writeFile(filePath, generateMigrationFile(options));
        console.log(`Migration file created: ${filePath}`);
        process.exit(0)

    } catch (error: any) {
        console.error(`Error creating migration file: ${error.message}`);
        process.exit(1)
    }
}

// Get migration name and table name from command line arguments
if (!argv.table || !argv.file || !argv.mode) {
    console.log(options);
    console.error('Please provide migration name and table name.');
    process.exit(1);
}

await createMigrationFile(options);
