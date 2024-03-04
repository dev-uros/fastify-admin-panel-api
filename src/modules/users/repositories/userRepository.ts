import fp from "fastify-plugin";
import UserRepositoryInterface from "./userRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class UserRepository implements UserRepositoryInterface{

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