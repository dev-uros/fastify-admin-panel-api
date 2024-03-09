import fp from "fastify-plugin";
import BlogRepositoryInterface from "./blogRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class BlogRepository implements BlogRepositoryInterface{

    }

    await fastify.decorate('BlogRepository', new BlogRepository())
}, {
    name: 'BlogRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        BlogRepository: BlogRepositoryInterface
    }
}
