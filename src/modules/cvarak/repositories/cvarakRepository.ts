import fp from "fastify-plugin";
import CvarakRepositoryInterface from "./cvarakRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class CvarakRepository implements CvarakRepositoryInterface{

    }

    await fastify.decorate('CvarakRepository', new CvarakRepository())
}, {
    name: 'CvarakRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        CvarakRepository: CvarakRepositoryInterface
    }
}
