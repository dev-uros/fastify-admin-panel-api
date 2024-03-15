import { FastifyPluginAsync } from 'fastify'
import {
  inpspirationBootstrapResponseSchema,
  InpspirationBootstrapResponseSchemaType
} from '../schemas'

const inpspirationRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: InpspirationBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from inpspiration pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'hello from /inpspiration'
      })
    },
    schema: {
      tags: ['inpspiration'],
      summary: 'Inpspiration Domain Module',
      description: 'Inpspiration Domain Module Bootstrap',
      response: {
        200: inpspirationBootstrapResponseSchema,
      }
    }
  })
}

export default inpspirationRoutes
