import { FastifyPluginAsync } from 'fastify'
import {
  cvarakBootstrapResponseSchema,
  CvarakBootstrapResponseSchemaType
} from '../schemas'

const cvarakRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: CvarakBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from cvarak pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'hello from /cvarak'
      })
    },
    schema: {
      tags: ['cvarak'],
      summary: 'Cvarak Domain Module',
      description: 'Cvarak Domain Module Bootstrap',
      response: {
        200: cvarakBootstrapResponseSchema,
      }
    }
  })
}

export default cvarakRoutes
