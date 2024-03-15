import { FastifyPluginAsync } from 'fastify'
import {
  inspirationBootstrapResponseSchema,
  InspirationBootstrapResponseSchemaType
} from '../schemas'

const inspirationRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: InspirationBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from inspiration pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'hello from /inspiration'
      })
    },
    schema: {
      tags: ['inspiration'],
      summary: 'Inspiration Domain Module',
      description: 'Inspiration Domain Module Bootstrap',
      response: {
        200: inspirationBootstrapResponseSchema,
      }
    }
  })
}

export default inspirationRoutes
