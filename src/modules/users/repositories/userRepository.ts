import fp from "fastify-plugin";
import UserRepositoryInterface from "./userRepositoryInterface";
import {Insertable, Kysely, Selectable, sql, Transaction, Updateable} from "kysely";
import {DB, Users} from "kysely-codegen";

export default fp(async (fastify, opts) => {

    class UserRepository implements UserRepositoryInterface {

        public async getUserList(executor: Kysely<DB> | Transaction<DB>): Promise<Selectable<Users>[]> {
            return await executor
                .selectFrom('users')
                .selectAll()
                .orderBy('id')
                .execute()
        }

        public async getUserById(executor: Kysely<DB> | Transaction<DB>, userId: number): Promise<Selectable<Users> | undefined> {
            return await executor
                .selectFrom('users')
                .selectAll()
                .where('id', '=', userId)
                .executeTakeFirst()
        }

        public async checkDoesUserEmailExist(executor: Kysely<DB> | Transaction<DB>, email: string) {
            return await executor
                .selectFrom('users')
                .select('id')
                .where('email', '=', email)
                .executeTakeFirst();
        }

        public async checkDoesUserEmailExistIgnoringUser(executor: Kysely<DB> | Transaction<DB>, email: string, userId: number) {
            return await executor
                .selectFrom('users')
                .select('id')
                .where('email', '=', email)
                .where('id', '!=', userId)
                .executeTakeFirst();
        }

        public async checkDoesUserProfilePictureExist(executor: Kysely<DB> | Transaction<DB>, profilePicture: string) {
            return await executor
                .selectFrom('users')
                .select('id')
                .where('profile_picture_path', '=', profilePicture)
                .executeTakeFirst();
        }

        public async storeUser(executor: Kysely<DB> | Transaction<DB>, user: Insertable<Users>): Promise<Selectable<Users> | undefined> {
            return await executor
                .insertInto('users')
                .values(user)
                .returningAll()
                .executeTakeFirst();
        }

        public async updateUser(executor: Kysely<DB> | Transaction<DB>, user: Updateable<Users>, userId: number): Promise<Selectable<Users> | undefined> {
            return await executor
                .updateTable('users')
                .where('id', '=', userId)
                .set(user)
                .returningAll()
                .executeTakeFirst();
        }

        public async deleteUser(executor: Kysely<DB> | Transaction<DB>, userId: number): Promise<Selectable<Users> | undefined> {
            return await executor
                .updateTable('users')
                .where('id', '=', userId)
                .set({
                    deleted_at: sql`now()`
                })
                .returningAll()
                .executeTakeFirst();
        }
    }

    await fastify.decorate('UserRepository', new UserRepository())
}, {
    name: 'UserRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        UserRepository: UserRepositoryInterface
    }
}