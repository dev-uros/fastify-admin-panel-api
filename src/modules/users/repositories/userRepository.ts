import fp from "fastify-plugin";
import UserRepositoryInterface from "./userRepositoryInterface";
import {Kysely, Transaction} from "kysely";
import {DB} from "kysely-codegen";
export default fp(async(fastify, opts)=>{

    class UserRepository implements UserRepositoryInterface{
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

        public async storeUser(executor: Kysely<DB> | Transaction<DB>, user: {first_name: string, last_name: string, email: string, profile_picture_path:string}){
            return await executor
                .insertInto('users')
                .values({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    profile_picture_path: user.profile_picture_path
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