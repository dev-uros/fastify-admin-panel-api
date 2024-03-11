import { FastifyPluginAsync } from 'fastify'
import {userListResponseSchema, UserListResponseSchemaType} from "../schemas/userListSchema";
import {userStoreRequestSchema} from "../schemas/userStoreSchema";
// import {userStoreRequestSchema, UserStoreRequestSchemaType} from "../schemas/userStoreSchema";

const userRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.route<{
    Reply: UserListResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      fastify.log.info('Hello from users INDEX pre handler!')
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
        200: userListResponseSchema
      }
    }
  })


  fastify.route<{
    // Body: UserStoreRequestSchemaType
  }>({
    url: '/',
    method: 'POST',
    preHandler: async(request, reply)=> {
      fastify.log.info('Hello from users STORE pre handler!')
    },
    handler: async (request, reply) => {
      return reply.send({
        message: 'Successfully created user',
        data: await fastify.UserService.storeUser(request.body)
      })
    },
    schema: {
      tags: ['users'],
      summary: 'User Domain Module',
      description: 'User Domain Module Bootstrap',
      consumes: ['multipart/form-data'],
      body: userStoreRequestSchema,
      response: {
        200: userListResponseSchema
      }
    }
  })
}

export default userRoutes
