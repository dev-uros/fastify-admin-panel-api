import { FastifyPluginAsync } from 'fastify'
import {
  userListResponseSchema,
  UserListResponseSchemaType
} from '../schemas/userListSchema'
import {
  userStoreRequestSchema,
  UserStoreRequestSchemaType
} from '../schemas/userStoreSchema'
import fs from 'node:fs/promises'
import path from 'node:path'
import fastifyMultipart from '@fastify/multipart'
const userRoutes: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  async function onFile(part: any) {
    part.value = {
      filename: part.filename,
      mimetype: part.mimetype,
      file: await part.toBuffer()
    }
  }
  await fastify.register(fastifyMultipart, {
    attachFieldsToBody: 'keyValues',
    onFile,
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 1000000, // For multipart forms, the max file size in bytes
      files: 1, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
      parts: 1000 // For multipart forms, the max number of parts (fields + files)
    }
  })
  fastify.route<{
    Reply: UserListResponseSchemaType
  }>({
    url: '/',
    method: 'GET',
    preHandler: async (request, reply) => {
      console.log(fastify.appRootPath)
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
    Body: UserStoreRequestSchemaType
  }>({
    url: '/',
    method: 'POST',
    preHandler: async (request, reply) => {
      const __dirname = path.dirname(new URL(import.meta.url).pathname)

      const uploadDirectory = path.join(__dirname) + '/test.png'
      await fs.writeFile(
        uploadDirectory,
        request.body.profile_picture_path.file
      )
      console.log('File saved successfully:', uploadDirectory)

      fastify.log.info('Hello from users STORE pre handler!')
    },
    handler: async (request, reply) => {
      console.log('evo iz handlera')
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
