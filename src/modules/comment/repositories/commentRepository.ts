import fp from "fastify-plugin";
import CommentRepositoryInterface from "./commentRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class CommentRepository implements CommentRepositoryInterface{

    }

    await fastify.decorate('CommentRepository', new CommentRepository())
}, {
    name: 'CommentRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        CommentRepository: CommentRepositoryInterface
    }
}
