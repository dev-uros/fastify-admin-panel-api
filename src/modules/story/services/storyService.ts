import fp from 'fastify-plugin'
import {StoryServiceInterface} from "./storyServiceInterface";

export default fp(async(fastify, opts)=>{

    class StoryService implements StoryServiceInterface{

    }

    fastify.decorate('StoryService', new StoryService());
}, {
    name: 'StoryService',
    dependencies: ['database', 'StoryRepository']
})