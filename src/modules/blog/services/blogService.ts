import fp from 'fastify-plugin'
import {BlogServiceInterface} from "./blogServiceInterface";

export default fp(async(fastify, opts)=>{

    class BlogService implements BlogServiceInterface{

    }

    fastify.decorate('BlogService', new BlogService());
}, {
    name: 'BlogService',
    dependencies: ['database', 'BlogRepository']
})