import { FastifyPluginAsync } from 'fastify'
import {
  commentBootstrapResponseSchema,
  CommentBootstrapResponseSchemaType
} from '../schemas'

const commentRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: CommentBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from comment pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'hello from /comment'
      })
    },
    schema: {
      tags: ['comment'],
      summary: 'Comment Domain Module',
      description: 'Comment Domain Module Bootstrap',
      response: {
        200: commentBootstrapResponseSchema,
      }
    }
  })
}

export default commentRoutes
