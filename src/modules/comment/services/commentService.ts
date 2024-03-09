import fp from 'fastify-plugin'
import {CommentServiceInterface} from "./commentServiceInterface";

export default fp(async(fastify, opts)=>{

    class CommentService implements CommentServiceInterface{

    }

    fastify.decorate('CommentService', new CommentService());
}, {
    name: 'CommentService',
    dependencies: ['database', 'CommentRepository']
})