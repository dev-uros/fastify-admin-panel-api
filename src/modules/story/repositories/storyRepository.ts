import fp from "fastify-plugin";
import StoryRepositoryInterface from "./storyRepositoryInterface";
export default fp(async(fastify, opts)=>{

    class StoryRepository implements StoryRepositoryInterface{

    }

    await fastify.decorate('StoryRepository', new StoryRepository())
}, {
    name: 'StoryRepository',
    dependencies: ['database']
})


declare module 'fastify' {
    export interface FastifyInstance {
        StoryRepository: StoryRepositoryInterface
    }
}
