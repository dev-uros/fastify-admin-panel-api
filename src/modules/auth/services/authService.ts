import fp from 'fastify-plugin'
import {AuthServiceInterface} from "./authServiceInterface";

export default fp(async(fastify, opts)=>{

    class AuthService implements AuthServiceInterface{

    }

    fastify.decorate('AuthService', new AuthService());
}, {
    name: 'AuthService',
    dependencies: ['database', 'AuthRepository']
})