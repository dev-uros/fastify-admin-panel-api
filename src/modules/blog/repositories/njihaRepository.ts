import fp from "fastify-plugin";
import NjihaRepositoryInterface from "./njihaRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class NjihaRepository implements NjihaRepositoryInterface{

    }

    await fastify.decorate('NjihaRepository', new NjihaRepository())
}, {
    name: 'NjihaRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        NjihaRepository: NjihaRepositoryInterface
    }
}
