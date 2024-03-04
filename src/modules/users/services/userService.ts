import fp from 'fastify-plugin'
import {UserServiceInterface} from "./userServiceInterface";

export default fp(async(fastify, opts)=>{

    class UserService implements UserServiceInterface{

    }

    fastify.decorate('UserService', new UserService());
}, {
    name: 'UserService',
    dependencies: ['database', 'UserRepository']
})