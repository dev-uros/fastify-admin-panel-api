import fp from 'fastify-plugin'
import {InpspirationServiceInterface} from "./inpspirationServiceInterface";

export default fp(async(fastify, opts)=>{

    class InpspirationService implements InpspirationServiceInterface{

    }

    fastify.decorate('InpspirationService', new InpspirationService());
}, {
    name: 'InpspirationService',
    dependencies: ['database', 'InpspirationRepository']
})