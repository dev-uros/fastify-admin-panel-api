import fp from "fastify-plugin";
import UserRepositoryInterface from "./userRepositoryInterface";
import {Insertable, Kysely, Selectable, Transaction} from "kysely";
import {DB, Users} from "kysely-codegen";
export default fp(async(fastify, opts)=>{

    class UserRepository implements UserRepositoryInterface{

        public async getUserList(executor: Kysely<DB> | Transaction<DB>): Promise<Selectable<Users>[]>{
            return await executor
            .selectFrom('users')
            .selectAll()
            .orderBy('id')
            .execute()
        }
        public async checkDoesUserEmailExist(executor: Kysely<DB> | Transaction<DB>, email: string){
            return await executor
                .selectFrom('users')
                .select('id')
                .where('email', '=', email)
                .executeTakeFirst();
        }

        public async checkDoesUserProfilePictureExist(executor: Kysely<DB> | Transaction<DB>, profilePicture: string){
            return await executor
                .selectFrom('users')
                .select('id')
                .where('profile_picture_path', '=', profilePicture)
                .executeTakeFirst();
        }

        public async storeUser(executor: Kysely<DB> | Transaction<DB>, user: Insertable<Users>): Promise<Selectable<Users> | undefined>
        {
            return await executor
                .insertInto('users')
                .values(user)
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