import { FastifyPluginAsync } from 'fastify'
import {
  userBootstrapResponseSchema,
  UserBootstrapResponseSchemaType
} from '../schemas'

const userRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: UserBootstrapResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from users pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'User list',
        data: await fastify.UserService.getUserList()
      })
    },
    schema: {
      tags: ['users'],
      summary: 'User Domain Module',
      description: 'User Domain Module Bootstrap',
      response: {
        200: userBootstrapResponseSchema
      }
    }
  })
}

export default userRoutes
