import fp from "fastify-plugin";
import InspirationRepositoryInterface from "./inspirationRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class InspirationRepository implements InspirationRepositoryInterface{

    }

    await fastify.decorate('InspirationRepository', new InspirationRepository())
}, {
    name: 'InspirationRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        InspirationRepository: InspirationRepositoryInterface
    }
}
