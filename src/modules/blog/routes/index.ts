import { FastifyPluginAsync } from 'fastify'
import {
  blogBootstrapResponseSchema,
  BlogBootstrapResponseSchemaType
} from '../schemas'

const blogRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: BlogBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from blog pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'hello from /blog'
      })
    },
    schema: {
      tags: ['blog'],
      summary: 'Blog Domain Module',
      description: 'Blog Domain Module Bootstrap',
      response: {
        200: blogBootstrapResponseSchema,
      }
    }
  })
}

export default blogRoutes
