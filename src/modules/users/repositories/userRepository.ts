import fp from "fastify-plugin";
import UserRepositoryInterface from "./userRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class UserRepository implements UserRepositoryInterface{
        public async check(){
            console.log('proveravam se');
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