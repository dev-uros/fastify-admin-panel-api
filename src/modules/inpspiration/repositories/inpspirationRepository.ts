import fp from "fastify-plugin";
import InpspirationRepositoryInterface from "./inpspirationRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class InpspirationRepository implements InpspirationRepositoryInterface{

    }

    await fastify.decorate('InpspirationRepository', new InpspirationRepository())
}, {
    name: 'InpspirationRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        InpspirationRepository: InpspirationRepositoryInterface
    }
}
