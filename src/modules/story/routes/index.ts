import { FastifyPluginAsync } from 'fastify'
import {
  storyBootstrapResponseSchema,
  StoryBootstrapResponseSchemaType
} from '../schemas'

const storyRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: StoryBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from story pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'hello from /story'
      })
    },
    schema: {
      tags: ['story'],
      summary: 'Story Domain Module',
      description: 'Story Domain Module Bootstrap',
      response: {
        200: storyBootstrapResponseSchema,
      }
    }
  })
}

export default storyRoutes
