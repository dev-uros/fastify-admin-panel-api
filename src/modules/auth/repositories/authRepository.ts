import fp from "fastify-plugin";
import AuthRepositoryInterface from "./authRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class AuthRepository implements AuthRepositoryInterface{

    }

    await fastify.decorate('AuthRepository', new AuthRepository())
}, {
    name: 'AuthRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        AuthRepository: AuthRepositoryInterface
    }
}
