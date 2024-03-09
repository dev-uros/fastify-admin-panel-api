import fp from "fastify-plugin";
import MarijanaRepositoryInterface from "./marijanaRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class MarijanaRepository implements MarijanaRepositoryInterface{

    }

    await fastify.decorate('MarijanaRepository', new MarijanaRepository())
}, {
    name: 'MarijanaRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        MarijanaRepository: MarijanaRepositoryInterface
    }
}
