import { FastifyPluginAsync } from 'fastify'
import {
  userBootstrapResponseSchema,
  UserBootstrapResponseSchemaType
} from '../schemas'

const userRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: UserBootstrapResponseSchemaType
    Body: UserBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'POST',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from users pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: request.body.message
      })
    },
    schema: {
      tags: ['users'],
      summary: 'User Domain Module',
      description: 'User Domain Module Bootstrap',
      body: userBootstrapResponseSchema,
      response: {
        200: userBootstrapResponseSchema,
        400: userBootstrapResponseSchema
      }
    }
  })
}

export default userRoutes
