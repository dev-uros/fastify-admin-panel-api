import fp from 'fastify-plugin'
import {CvarakServiceInterface} from "./cvarakServiceInterface";

export default fp(async(fastify, opts)=>{

    class CvarakService implements CvarakServiceInterface{

    }

    fastify.decorate('CvarakService', new CvarakService());
}, {
    name: 'CvarakService',
    dependencies: ['database', 'CvarakRepository']
})