import { FastifyPluginAsync } from 'fastify'
import {
  authBootstrapResponseSchema,
  AuthBootstrapResponseSchemaType
} from '../schemas'

const authRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: AuthBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from auth pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'hello from /auth'
      })
    },
    schema: {
      tags: ['auth'],
      summary: 'Auth Domain Module',
      description: 'Auth Domain Module Bootstrap',
      response: {
        200: authBootstrapResponseSchema,
      }
    }
  })
}

export default authRoutes
