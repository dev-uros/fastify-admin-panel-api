import fp from 'fastify-plugin'
import {InspirationServiceInterface} from "./inspirationServiceInterface";

export default fp(async(fastify, opts)=>{

    class InspirationService implements InspirationServiceInterface{

    }

    fastify.decorate('InspirationService', new InspirationService());
}, {
    name: 'InspirationService',
    dependencies: ['database', 'InspirationRepository']
})