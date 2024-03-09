import { FastifyPluginAsync } from 'fastify'
import {
  marijanaBootstrapResponseSchema,
  MarijanaBootstrapResponseSchemaType
} from '../schemas'

const marijanaRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: MarijanaBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from marijana pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'hello from /marijana'
      })
    },
    schema: {
      tags: ['marijana'],
      summary: 'Marijana Domain Module',
      description: 'Marijana Domain Module Bootstrap',
      response: {
        200: marijanaBootstrapResponseSchema,
      }
    }
  })
}

export default marijanaRoutes
