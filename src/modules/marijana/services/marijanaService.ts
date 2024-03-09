import fp from 'fastify-plugin'
import {MarijanaServiceInterface} from "./marijanaServiceInterface";

export default fp(async(fastify, opts)=>{

    class MarijanaService implements MarijanaServiceInterface{

    }

    fastify.decorate('MarijanaService', new MarijanaService());
}, {
    name: 'MarijanaService',
    dependencies: ['database', 'MarijanaRepository']
})