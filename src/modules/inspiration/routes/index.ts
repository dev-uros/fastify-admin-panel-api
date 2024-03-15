import { FastifyPluginAsync } from 'fastify'
import {
  inspirationBootstrapResponseSchema,
  InspirationBootstrapResponseSchemaType
} from '../schemas'
import { request as undiciRequest }  from 'undici'
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
      const {
        statusCode,
        body
      } = await undiciRequest('https://zenquotes.io/api/random');

      let quote = '';
      if(statusCode === 200){
        const quoteObject = await body.json() as {q: string, a: string, h:string}[];
        quote = quoteObject[0].q
      }else{
        quote = 'Inspiration not found :('
      }

      return reply.send({
        message: quote
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
